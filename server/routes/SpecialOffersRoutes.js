const express = require("express");
const SpecialOffersController = require("../controllers/SpecialOffersController");
const IsExisted = require("../middlewares/IsExisted");

const router = express.Router();

router.get("/", SpecialOffersController.GetAllSpecialOffers);
router.get("/:id", SpecialOffersController.GetOneSpecialOffer);
router.post(
  "/create",
  IsExisted,
  SpecialOffersController.CreateNewSpecialOffer
);
router.put("/edit/:id", IsExisted, SpecialOffersController.UpdateSpecialOffer);
router.delete(
  "/delete/:id",
  IsExisted,
  SpecialOffersController.DeleteSpecialOffer
);

module.exports = router;
