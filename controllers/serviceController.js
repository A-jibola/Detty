const Service = require('../models/serviceModel');

const serviceController = {
    getAllServices: async (req, res)=>{
        try{
            const services = await Service.find();
            return res.json({message: 'Services Retrieved Successfully', services: services, responseType: 'Success'});
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },

    getFilteredServices: async (req, res)=>{
        try{
            let filter = req.body.filter;
            const name = req.body.filter.name;
            filter = {...filter, name: new RegExp(name, 'i') };
            if(filter.name === ""){
                delete filter.name;
            }
            if(filter.isAvailable){
                filter = {...filter, isAvailable: (filter.isAvailable === 'true') };
            }
            if(filter){
                const services = await Service.find(filter);
                return res.json({message: 'Services Retrieved Successfully', services: services, responseType: 'Success'});
            }
            return res.json({message: 'No filter', responseType: 'Error'});
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    getService: async (req, res)=>{
        try{
            const serviceId = req.params.serviceId;
            const service = await Service.findById(serviceId);
            if(!service){
                return res.json({message: 'Service not found', responseType: 'Error'});
            }
            return res.json({message: 'Service Retrieved Successfully', service: service, responseType: 'Success'});
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
};

module.exports = serviceController;