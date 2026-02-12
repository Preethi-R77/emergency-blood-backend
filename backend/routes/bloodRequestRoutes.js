const express = require("express");
const bloodRequestController = require("../controllers/bloodRequestController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, bloodRequestController.createBloodRequest);
router.get("/", authMiddleware, bloodRequestController.getAllBloodRequests);
router.get("/alerts", authMiddleware, bloodRequestController.getShortageAlerts);
router.get("/:id", authMiddleware, bloodRequestController.getBloodRequestById);
router.put("/:id", authMiddleware, bloodRequestController.updateBloodRequest);
router.delete("/:id", authMiddleware, bloodRequestController.deleteBloodRequest);

module.exports = router;
