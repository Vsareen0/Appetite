const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignIn } = require('../controllers/auth');

// Validators
const { runValidation } = require('../validators/index');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.post("/signup", userSignupValidator , runValidation , signup); 
router.post("/signin", userSigninValidator , runValidation , signin);
router.get("/signout", signout); 

// testing
// router.get("/secret", requireSignIn, (req,res) => {
//     res.json({
//         user: req.user
//     })
// });

module.exports = router;