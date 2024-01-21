const Reservation = require('../models/reservationModel');
const User = require('../models/userModel');
const Service = require('../models/serviceModel');
const receiptManager = require('../middleware/receiptTemplate');
const https = require('https');

const reservationController = {
    createReservation: async (req, res)=>{
        const {serviceId, singleDateBooked, multipleDateBooked, durationBooked} = req.body;
        const user = await User.findOne({email: req.user.email});
        if(!user){
            return res.json({message: 'User not found', responseType: 'Error'});
        }
        const service = await Service.findById(serviceId);
        if(!service){
            return res.json({message: 'Service not found', responseType: 'Error'});
        }
        const reservation = new Reservation({
            serviceNumber: service.serviceNumber, userId: user._id, serviceId: service._id, 
            terms: service.terms, features: service.features, dateCreated: Date.now(), 
            serviceDurationInMinutes: service.serviceDurationInMinutes, serviceName: service.name,
            contactInfo: service.contactInfo, price: service.price, image: service.images[0]
        });
        if(singleDateBooked) reservation.singleDateBooked = singleDateBooked;
        if(multipleDateBooked) reservation.multipleDatesBooked = multipleDateBooked;
        if(durationBooked) {
            reservation.durationBooked.startDate = durationBooked.startDate
            reservation.durationBooked.endDate = durationBooked.endDate
        };
        reservation.paymentStatus = "Payment Pending"
        // create the receipt here!
        // const receipt64 = createReceipt(reservation, service.serviceNumber, user.email)
        // reservation.receipt = receipt64;

        await reservation.save();
        return res.json({message: 'Reservation Created Successfully', reservation: reservation, responseType: 'Success'});
    },
    deleteReservation: async(req, res)=>{
        try{
            const reservation = await Reservation.findByIdAndDelete(req.params.reservationId);
            return res.json({message: 'Reservation deleted Successfully!', responseType: 'Success'});  
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    GetReservation: async(req, res)=>{
        try{
            const reservation = await Reservation.findById(req.params.reservationId);
            return res.json({message: 'Reservation found Successfully!', reservation: reservation, responseType: 'Success'});  
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    GetUserReservations: async(req, res)=>{
        try{
            const reservation = await Reservation.find({userId: req.user._id});
            return res.json({message: 'Reservation found Successfully!', reservation: reservation, responseType: 'Success'});  
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    GetUserPaymentReservations: async(req, res)=>{
      try{
          const reservation = await Reservation.find({userId: req.user._id, paymentStatus: req.params.pay});
          return res.json({message: 'Reservation found Successfully!', reservation: reservation, responseType: 'Success'});  
      }
      catch(error){
          res.json({message: error.message, responseType: 'Error'});
      }
  },
    GetReceipt: async(req, res)=>{
        try{
            const reservation = await Reservation.findById(req.params.reservationId);
            if(!reservation.receipt) {
                return res.json({message: 'Reservation Receipt not found!', responseType: 'Error'});  
            }

            return res.json({message: 'Reservation found Successfully!', receipt: reservation.receipt, responseType: 'Success'});  
        }
        catch(error){
            res.status(500).json({message: error.message, responseType: 'Error'});
        }
    },
    makePayment: async (req, res) => {
        try {
          const reservation = await Reservation.findById(req.params.reservationId);
          if(reservation.paymentStatus === "Payment Complete"){
            return res.json({message: 'Payment Already Succeeded', paymentDetail: "Success", responseType: 'Success'});
          }
          const params = JSON.stringify({
            "email": req.user.email,
            "amount": "" + (reservation.price * 100),
            "callback_url" : "http://localhost:3000/confirm/"+reservation._id + '/'
          })
          const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + process.env.PAY_SECRET_KEY,
              'Content-Type': 'application/json'
            }
          }
          const paymentRequest = https.request(options, paymentResult => {
            let data = ''
    
            paymentResult.on('data', (chunk) => {
              data += chunk
            });
          
            paymentResult.on('end', async () => {
              const parsedData = JSON.parse(data);

              reservation.paymentReference = parsedData.data.reference;

              await reservation.save();    
              return res.json({message: 'Payment Intent Initiated', paymentDetail: parsedData, responseType: 'Success'});

            })
          }).on('error', error => {
            console.error(error)
            return res.json({message: 'Payment Failed', paymentDetail: error.message, responseType: 'Failed'});
          })
          paymentRequest.write(params)
          paymentRequest.end()
    
        } catch(error){
            res.status(500).json({message: error.message, responseType: 'Error'});
        }
    },
    confirmPayment : async(req, res) =>{
        try{
        const reservation = await Reservation.findById(req.params.reservationId);
        const serviceNameGetter = await Service.findById(reservation.serviceId, 'name');
        const userEmailGetter = await User.findById(reservation.userId, 'email');
        const serviceName = serviceNameGetter.name;
        const userEmail = userEmailGetter.email;

        if(reservation.receipt){
          return res.json({message: 'Payment Verification Completed', paymentstatus: 'Success', receipt: reservation.receipt, responseType: 'Success'});
        }

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/verify/' + reservation.paymentReference,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + process.env.PAY_SECRET_KEY
            }
          }
    
          const paymentRequest = https.request(options, paymentResult => {
            let data = ''
    
            paymentResult.on('data', (chunk) => {
              data += chunk
            });
          
            paymentResult.on('end', async () => {
              const parsedData = JSON.parse(data);
              const paymentstatus = parsedData.data.status
              if(paymentstatus === 'success'){
                reservation.paymentStatus = 'Payment Complete'
                reservation.receipt = await receiptManager.createReceipt(reservation, serviceName, userEmail)
              }else{
                reservation.paymentStatus = 'Payment Failed'
              }
              await reservation.save();
              return res.json({message: 'Payment Verification Completed', paymentstatus: paymentstatus, receipt: reservation.receipt, responseType: 'Success'});

            })
          }).on('error', error => {
            console.error(error)
            return res.json({message: 'Payment Failed', paymentDetail: error.message, responseType: 'Failed'});
          })
    
          paymentRequest.end()

        }
        catch(error){
            res.status(500).json({message: error.message, responseType: 'Error'});
        }
    }
}

module.exports = reservationController;