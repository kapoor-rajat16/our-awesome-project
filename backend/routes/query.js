const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Query = require('../models/Query')
const { body, validationResult } = require('express-validator');

router.post('/createquery', async (req, res) => {
    try {
        query = await Query.create({
            regNo: req.body.regNo,
            text: req.body.text,
            tag: req.body.tag
        })
        res.send("Success");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

router.put('/updatequery', async (req, res) => {
    try {
        const { _id, text, tag } = req.body;
        const q = await Query.findByIdAndUpdate(_id, { text, tag });
        res.send("Updated Successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

router.delete('/deletequery', async (req, res) => {
    try {
        let query = await Query.findByIdAndDelete(req.body._id);
        res.send(query)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

module.exports = router