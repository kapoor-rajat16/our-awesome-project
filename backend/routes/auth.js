const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

//ROUTE 2 - Create a user, no login required
router.post('/createuser', body('email').isEmail(), body('password').isLength({ min: 5 }), body('firstName').isLength({ min: 1 }), body('lastName').isLength({ min: 1 }), body('regNo').isLength({ min: 8, max: 8 }), body('year').isLength({ min: 1, max: 1 }),
  async (req, res) => {
    var success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      let userRegNo = await User.findOne({ regNo: req.body.regNo });

      if (user) {
        res.status(400).json({ error: "user with this email already exists" });
      }
      if (userRegNo) {
        res.status(400).json({ error: "user with this registration number already exists" });
      }


      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        regNo: req.body.regNo,
        course: req.body.course,
        branch: req.body.branch,
        year: req.body.year,
        email: req.body.email,
        password: secPass,
        about:req.body.about
      })
      const data = {
        user: {
          id: user.id
        }
      }
      const JWT_SECRET = 'shhhhh';
      var authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      success = true;
      res.send({ authtoken, success })
    }
    catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Something went wrong" })
    }
  })

//ROUTE 2 - Authenticate a user, no login required
router.post('/login', body('email').isEmail(), body('password').exists(),
  async (req, res) => {
    var success = false;
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
      // console.log(authtoken);
      success = true;
      res.send({ authtoken, success });
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error!");
    }
  })

//ROUTE 3 - Get User Data, login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error!");
  }
})

//ROUTE 4 - Updating User Profile, login required
router.put('/updateuser', async (req, res) => {
  try {
    // console.log(req.body);
    let u = await User.findOne({ regNo: req.body.regNo });
    console.log(u);
    const { leetcode, codeforces, year, branch, about } = req.body;
    const user = await User.findByIdAndUpdate(u._id, { leetcode, codeforces,year,branch,about });
    res.send(user);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error!");
  }
})
module.exports = router