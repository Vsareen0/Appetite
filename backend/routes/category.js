const express = require('express');
const router = express.Router();
const { requireSignIn, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/category');

// Validators
const { runValidation } = require('../validators/index');
const { categoryValidator } = require('../validators/category');

router.post("/category", categoryValidator, runValidation, requireSignIn, adminMiddleware, create ); 
router.get("/categories", list ); 
router.get("/category/:slug", read ); 
router.delete("/category/:slug", requireSignIn, adminMiddleware, remove ); 




module.exports = router;