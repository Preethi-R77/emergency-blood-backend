const express = require("express");
const bloodStockController = require("../controllers/bloodStockController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, bloodStockController.getAllBloodStock);
router.get("/:bloodGroup", authMiddleware, bloodStockController.getBloodStockByGroup);
// Admin cleanup endpoint - recalculate all blood stock from donors
router.post("/admin/recalculate", bloodStockController.recalculateBloodStock);

module.exports = router;
