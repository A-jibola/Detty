require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const userRouter = require('./routes/userRoutes')
const serviceRouter = require('./routes/serviceRoutes')
const reservationRouter = require('./routes/reservationRoutes')

const server = express();
server.use(express.json())
server.use(cors())
server.use(express.static('view/build'))

//Routes;
server.use('/user', userRouter);
server.use('/service', serviceRouter);
server.use('/reservation', reservationRouter);

server.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/build/index.html"));
  });

server.listen(process.env.PORT, async function(){
    console.log('server is listening on port: '+ process.env.PORT);
    try{
        await mongoose.connect(process.env.PORT);
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.log(error);
    }
})
