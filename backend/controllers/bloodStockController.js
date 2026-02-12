const BloodStock = require("../models/BloodStock");
const Donor = require("../models/Donor");

// Get all blood stock
exports.getAllBloodStock = async (req, res) => {
  try {
    const stock = await BloodStock.find();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blood stock by blood group
exports.getBloodStockByGroup = async (req, res) => {
  try {
    const stock = await BloodStock.findOne({ bloodGroup: req.params.bloodGroup });
    if (!stock) {
      return res.status(404).json({ message: "Blood group not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cleanup: Recalculate all blood stock from donors
exports.recalculateBloodStock = async (req, res) => {
  try {
    const allBloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

    // Delete all existing blood stock
    await BloodStock.deleteMany({});

    // Get all donors and group by blood group
    const donors = await Donor.find();
    const bloodGroupUnits = {};

    donors.forEach((donor) => {
      if (!bloodGroupUnits[donor.bloodGroup]) {
        bloodGroupUnits[donor.bloodGroup] = 0;
      }
      bloodGroupUnits[donor.bloodGroup] += Number(donor.unitsDonated) || 0;
    });

    // Create new blood stock records for all groups
    const newStockRecords = allBloodGroups.map((group) => ({
      bloodGroup: group,
      availableUnits: bloodGroupUnits[group] || 0,
    }));

    await BloodStock.insertMany(newStockRecords);

    res.status(200).json({
      message: "Blood stock recalculated successfully",
      stock: newStockRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
