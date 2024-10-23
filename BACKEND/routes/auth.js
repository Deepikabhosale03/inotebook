const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "hello";
const fetchUser=require('../middleware/fetchUser');
//Route 1-create user using post api/auth/createuser-no login require
router.post(
  "/createuser",
  [
    body("name", "Name should be atleast 3 character").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password should atleast 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    /* obj={
        a:"aaa",
        number:34
    }
    res.json(obj)*/

    /*
   //save user without validation 
   console.log(req.body)
    const user=User(req.body);
     user.save();*/
    //save user with express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let user = await User.findOne({email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a ,user with this email already exists" });
      }

      //Generte password with bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //.then(user=>res.json(user))
      //.catch(err=>{console.log(err)
      //res.json({err1:'please enter unique email'+err.message})});
      // res.send(req.body);
      // res.json({"hello":"hello"});
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData);
      //res.json(user);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
//Route 2-authunticate user using post api/auth/login-no login require
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "please user with valid crediential" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "please user with valid crediential" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);
//Route 3-authunticate user using post api/auth/get user-login require
router.post(
    "/getuser",fetchUser,async (req, res) => {
        try {
            userId=req.user.id;
            const user=await User.findById(userId).select('-password');
            res.send(user);
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    });
module.exports = router;
