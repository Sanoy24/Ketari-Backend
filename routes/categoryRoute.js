const express = require("express");
const roleAuthCheck = require("../Middleware/roleAuthCheck");
const {
  getAllCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router
  .get("/all-category", getAllCategory)
  .post("/add-category", roleAuthCheck, createCategory)
  .delete("/delete/:id", roleAuthCheck, deleteCategory);

module.exports = router;
