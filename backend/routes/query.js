const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Query = require('../models/Query')
const { body, validationResult } = require('express-validator');

router.post('/getqueries', async (req, res) => {
    try {
        const query = await Query.find();
        res.json(query);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

router.post('/createquery', async (req, res) => {
    try {
        let query = await Query.create({
            regNo: req.body.regNo,
            userName:req.body.firstName + ' ' +req.body.lastName,
            heading:req.body.heading,
            text: req.body.text,
            tag: req.body.tag
        })
        res.send(query);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

router.put('/updatequery', async (req, res) => {
    try {
        const { _id, text, tag ,heading} = req.body;
        const query = await Query.findByIdAndUpdate(_id, { text, tag , heading});
        console.log("Updated Successfully");
        const updatedQuery = await Query.findById(_id);
        res.send(updatedQuery);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

router.delete('/deletequery', async (req, res) => {
    try {
        console.log(req.body._id);
        let query = await Query.findByIdAndDelete(req.body._id);
        res.json('Deleted Successfully!')
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" })
    }
})

module.exports = router