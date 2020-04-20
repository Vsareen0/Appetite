const express = require('express');
const router = express.Router();
const { create, list, listAllBlogsCategoriesTags, read, remove, update, photo, listRelated, listSearch } = require('../controllers/blog');
const { requireSignIn, adminMiddleware} = require('../controllers/auth')

router.post("/blog", requireSignIn, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignIn, adminMiddleware, remove);
router.put("/blog/:slug", requireSignIn, adminMiddleware, update); 
router.get("/blog/photo/:slug", photo); 
router.post("/blogs/related", listRelated); 
router.get("/blog/search", listSearch); 


module.exports = router;