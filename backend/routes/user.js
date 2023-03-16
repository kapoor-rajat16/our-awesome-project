const express = require('express');
const router = express.Router();
const User = require('../models/User')

// ROUTE 1 - Get User Info Through regitration Number
router.post('/', async(req,res) => {
    console.log(req.body);
    const {regNo} = req.body;
    let user = await User.findOne({regNo:regNo})
    console.log(user);
    res.send(user);
})

module.exports = router