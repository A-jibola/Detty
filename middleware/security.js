require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SecurityManager = {
    createAccessToken: user=>{
        return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '7d'})
    },
    encrypt: async password=>{
        return await bcrypt.hash(password, 10)
    },
    authenticate: async (password, inputPassword)=>{
        return await bcrypt.hash(password, inputPassword)
    },
    authorize: (req, res, next)=>{
        try{
            const token = req.header('Authorization');
            if(!token) return res.json({message: 'You are not signed in'});

            jwt.verify(token, process.env.ACCESS_TOKEN, (error, user)=>{
                if(error) return res.json({message: 'Please sign in again'});
                req.user = user;
                next();
            })
        }
        catch(error){
            res.json({message: error.message})
        }
    }
}

module.exports = SecurityManager;