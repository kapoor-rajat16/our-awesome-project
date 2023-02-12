const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

//ROUTE 2 - Create a user, no login required
router.post('/createuser', body('email').isEmail(), body('password').isLength({ min: 5 }), body('name').isLength({ min: 4 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({ error: "user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        regNo:req.body.regNo,
        stream:req.body.stream,
        year:req.body.year,
        email: req.body.email,
        password: secPass
      })
      const data = {
        user: {
          id: user.id
        }
      }
      const JWT_SECRET = 'shhhhh';
      var authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      res.send({ authtoken })
    }
    catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Something went wrong" })
    }
  })

//ROUTE 2 - Authenticate a user, no login required
router.post('/login', body('email').isEmail(), body('password').exists(),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log("user not found");
        return res.status(400).json({ error: "please use correct credentials!" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ error: "please use correct credentials!" });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      JWT_SECRET = 'shhhhh';
      var authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      res.send({ authtoken });
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error!");
    }
  })

  router.post('/getuser', fetchuser, async(req,res) => {
    try{
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch(error){
      console.log(error.message);
      res.status(500).send("internal server error!");
    }
  })
module.exports = router