const User = require("../models/user");
const Blog = require("../models/blog");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
const nodemailer = require('nodemailer');
const _ = require('lodash');

// Signup controller
exports.signup = (req, res) => {
  // Check if user exists
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({ error: "Email is already registered." });

    const { name, email, password } = req.body;
    let username = shortid.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) return res.status(400).json({ error: err });
      // res.json({ user: success });
      res.json({ message: "Signup Success ! Please sign in" });
    });
  });
};

// Signup controller
exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res.status(400).json({
        error: "User with that email does not exist, Please sign up !",
      });

    // Authenticate
    if (!user.authenticate(password))
      return res
        .status(400)
        .json({ error: "Email and password do not match." });

    // Generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1 d",
    });

    res.cookie("token", token, { expiresIn: "1 d" });

    const { _id, username, name, email, role } = user;

    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found.",
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found.",
      });
    }

    if (user.role != 1) {
      return res.status(400).json({
        error: "Admin resource. Access Denied",
      });
    }

    req.profile = user;
    next();
  });
};

exports.canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    let authorizedUser = data.postedBy._id.toString() == req.profile._id.toString();
    if (!authorizedUser) {
      return res.status(400).json({ error: "You are not authorized" });
    }
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const {email} = req.body;

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(401).json({error: 'User with that email does not exist !'});
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'});

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: `${process.env.EMAIL_TO}`,
             pass: `${process.env.PASSWORD}`
         }
     });
    
     const mailOptions = {
      to: email, // sender address
      from: `${process.env.EMAIL_FROM}`, // list of receivers
      subject: 'Password Reset Link', // Subject line
      html: `
          <p>Please use the following link to reset your password : </p>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>https://appetite.com</p>
      `
    };
    
    return user.updateOne({resetPasswordLink: token}, (err, success) => {
      if(err) return res.json({error: errorHandler(err)});
      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          const errStr = err.response.substr(10,35);
          return res.status(400).json({error: errStr});
        }
        res.json({message: `Email has been sent to ${email}. Please follow the instructions to reset the password. Link expires in 10 minutes.`});
      });
    });
    
  
  });

};

exports.resetPassword = (req, res) => {
  const {resetPasswordLink, newPassword} = req.body;

  if(resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
      if(err) return res.status(400).json({error: 'Link expired. Try again'});
      User.findOne({resetPasswordLink}, (err, user) => {
        if(err || !user) return res.status(401).json({error: 'Something went wrong. Try later'});
        
        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
        }

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if(err) return res.status(400).json({error: errorHandler(err)});
          res.json({message: `Great ! Login with new password and read and post amazing content.`});
        });
      });
    });
  }
};
