const express = require('express');
const router = express.Router();
const { requireSignIn, authMiddleware } = require('../controllers/auth');
const { read, publicProfile } = require('../controllers/user');

router.get("/profile", requireSignIn, authMiddleware, read ); 
router.get("/user/:username", publicProfile ); 


module.exports = router;