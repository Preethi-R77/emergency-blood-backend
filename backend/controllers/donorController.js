const Donor = require("../models/Donor");
const BloodStock = require("../models/BloodStock");

// Add new donor
exports.addDonor = async (req, res) => {
  try {
    const { name, bloodGroup, unitsDonated, location, phoneNumber } = req.body;

    if (!name || !bloodGroup || !unitsDonated || !location || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert unitsDonated to number
    const units = Number(unitsDonated);

    const newDonor = new Donor({
      name,
      bloodGroup,
      unitsDonated: units,
      location,
      phoneNumber,
    });

    await newDonor.save();

    // Update blood stock
    let bloodStock = await BloodStock.findOne({ bloodGroup });
    if (bloodStock) {
      bloodStock.availableUnits = Number(bloodStock.availableUnits) + units;
      await bloodStock.save();
    } else {
      bloodStock = new BloodStock({
        bloodGroup,
        availableUnits: units,
      });
      await bloodStock.save();
    }

    res.status(201).json({
      message: "Donor added successfully",
      donor: newDonor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donor by ID
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update donor (only name and phone number)
exports.updateDonor = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { name, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({
      message: "Donor updated successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete donor
exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Update blood stock
    const bloodStock = await BloodStock.findOne({ bloodGroup: donor.bloodGroup });
    if (bloodStock) {
      bloodStock.availableUnits -= donor.unitsDonated;
      if (bloodStock.availableUnits <= 0) {
        await BloodStock.deleteOne({ _id: bloodStock._id });
      } else {
        await bloodStock.save();
      }
    }

    res.status(200).json({
      message: "Donor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
