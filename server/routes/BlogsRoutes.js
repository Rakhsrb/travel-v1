const express = require("express");
const BlogsController = require("../controllers/BlogsController");
const IsExisted = require("../middlewares/IsExisted");

const router = express.Router();

router.get("/", BlogsController.getAllBlogs);
router.get("/:id", BlogsController.getOneBlog);
router.post("/create", IsExisted, BlogsController.createNewBlog);
router.put("/edit/:id", IsExisted, BlogsController.updateBlog);
router.delete("/delete/:id", IsExisted, BlogsController.deleteBlog);

module.exports = router;
