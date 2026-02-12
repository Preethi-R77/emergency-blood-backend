const express = require("express");
const donorController = require("../controllers/donorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, donorController.addDonor);
router.get("/", authMiddleware, donorController.getAllDonors);
router.get("/:id", authMiddleware, donorController.getDonorById);
router.put("/:id", authMiddleware, donorController.updateDonor);
router.delete("/:id", authMiddleware, donorController.deleteDonor);

module.exports = router;
