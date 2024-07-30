const express = require("express");
const adminController = require("../controllers/adminController");
const IsExisted = require("../middlewares/IsExisted");

const router = express.Router();

router.get("/", IsExisted, adminController.GetAllAccounts);
router.get("/:id", IsExisted, adminController.GetAdminById);
router.post("/login", adminController.LoginToAccount);
router.post("/create", IsExisted, adminController.CreateAccount);
router.delete("/delete/:id", IsExisted, adminController.DeleteAccount);
router.put("/update/:id", IsExisted, adminController.UpdateAccount);

module.exports = router;
