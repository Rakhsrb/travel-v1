const express = require("express");
const FeaturedDestinationController = require("../controllers/FeaturedDestinationController");
const IsExisted = require("../middlewares/IsExisted");

const router = express.Router();

router.get("/", FeaturedDestinationController.getAllFeaturedDestinations);
router.get("/:id", FeaturedDestinationController.getOneFeaturedDestination);
router.post(
  "/create",
  IsExisted,
  FeaturedDestinationController.createFeaturedDestination
);
router.put(
  "/edit/:id",
  IsExisted,
  FeaturedDestinationController.updateFeaturedDestination
);
router.delete(
  "/delete/:id",
  IsExisted,
  FeaturedDestinationController.deleteFeaturedDestination
);

module.exports = router;
