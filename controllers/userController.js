const securityManager = require('../middleware/security');
const User = require('../models/userModel');
const Service = require('../models/serviceModel');
const { ObjectId } = require('mongodb');

const userController = {
    register: async(req, res)=>{
        try{
            const {email, password} = req.body;
            const userexists = await User.findOne({email: email});
            if(userexists){
                return res.json({message: 'Sorry; This user already has an account', responseType: 'Error'});
            }
            const hashedPassword = await securityManager.encrypt(password);
            const newUser = new User({
                email: email,
                password: hashedPassword
            });
            await newUser.save();
            return res.json({message: 'Account Created Successfully, Please Sign In', responseType: 'Success'});
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    SignIn: async(req, res)=>{
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if(!user){
                return res.json({message: 'Sorry; This email does not have an account', responseType: 'Error'});
            }
            const confirmPassword = securityManager.authenticate(password, user.password)
            if(!confirmPassword){
                return res.json({message: 'Sorry; This password is incorrect, try again', responseType: 'Error'});
            }
            const userPayload = { _id:user._id, email: user.email  }
            const token = securityManager.createAccessToken(userPayload);
            return res.json({message: 'Login Successful!', token: token, responseType: 'Success'});
        }catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    editUserDetails: async(req, res)=>{
        try{
            const {email, password, oldPassword} = req.body;
            const hashedPassword = await securityManager.encrypt(password);
            const user = await User.findOne({email: req.user.email});
            if(!user){
                return res.json({message: 'Sorry; This email does not have an account', responseType: 'Error'});
            }
            const oldPasswordMatch = await securityManager.authenticate(oldPassword, user.password);
            if(!oldPasswordMatch){
                return res.json({message: 'Sorry; Old Password is Incorrect', responseType: 'Error'});
            }
            email? user.email = email: ""
            password? user.password = hashedPassword: ""
            user.save();
            return res.json({message: 'Account Updated Successfully, Please logout and Login again!', responseType: 'Success'});    
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    deleteUser: async(req, res)=>{
        try{
            const user = await User.findByIdAndDelete(req.user._id);
            if(!user){
                return res.json({message: 'Sorry; This Account does not exist', responseType: 'Error'});
            }
            return res.json({message: 'Account deleted Successfully!', responseType: 'Success'});    
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    getUserEmail: async(req, res)=>{
        try{
            if(!req.user){
                return res.json({message: 'Sorry; This email does not have an account', loggedIn: false, responseType: 'Error'});
            }
            const user = await User.findOne({email: req.user.email});
            return res.json({message: 'User Email Retrieved Successfully!', userEmail: user.email, loggedIn:true,  responseType: 'Success'});    
        }        
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }

    },
    getUserSaves: async(req, res)=>{
        try{
            const user = await User.findOne({email: req.user.email});
            if(!user){
                return res.json({message: 'Sorry; This email does not have an account', responseType: 'Error'});
            }
            const saves = user.saves;
            const serviceSaved = await Service.find({_id: {$in: saves}});
            return res.json({message: 'Saved Services Retrieved Successfully!', saveService: serviceSaved, responseType: 'Success'});    
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    saveService: async(req, res)=>{
        try{
            const service = await Service.findById(req.params.savesId);
            if(!service){
                return res.json({message: 'Sorry; This service does not exist', responseType: 'Error'});
            }
            const user = await User.findById(req.user._id);
            if(user.saves.indexOf(service._id) == -1){
                const userSaves = user.saves ? user.saves : [];
                userSaves.push(service._id);
                const newSaves = await User.findByIdAndUpdate(req.user._id, {saves: userSaves}, {new: true}); 
                return res.json({message: 'Added to saves', saves: newSaves.saves, responseType: 'Success'});
            } 
            else{
                return res.json({message: 'Already in saves', saves: user.saves, responseType: 'Success'});
            }   
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    },
    removeService: async(req, res)=>{
        try{
            const service = await Service.findById(req.params.savesId);
            if(!service){
                return res.json({message: 'Sorry; This service does not exist', responseType: 'Error'});
            }
            const user = await User.findById(req.user._id);
            const userSaves = user.saves;
            userSaves.splice(userSaves.indexOf(service._id), 1);
            const newSaves = await User.findByIdAndUpdate(req.user._id, {saves: userSaves}, {new: true}); 
            return res.json({message: 'Removed from saves', saves: newSaves.saves, responseType: 'Success'});    
        }
        catch(error){
            res.json({message: error.message, responseType: 'Error'});
        }
    }
};

module.exports = userController;