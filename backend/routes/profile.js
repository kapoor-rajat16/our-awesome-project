const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

// Route 1 - Upload Or Update Profile Image - Login Required

// router.post('/update-profile-picture', fetchuser, async(req,res) => {
//     try{

//     }
//     catch(error){
//         console.log(error.message);
//         res.status(500).send('Internal Server Error!');
//     }
// })
