const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Query = require('../models/Query')
const { body, validationResult } = require('express-validator');

router.post('/', (req,res) => {
    res.send("working");
})



module.exports = router