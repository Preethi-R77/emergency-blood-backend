const BloodRequest = require("../models/BloodRequest");
const BloodStock = require("../models/BloodStock");

// Create blood request
exports.createBloodRequest = async (req, res) => {
  try {
    const { patientName, requiredBloodGroup, requiredUnits, location, phoneNumber } = req.body;

    if (
      !patientName ||
      !requiredBloodGroup ||
      !requiredUnits ||
      !location ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new BloodRequest({
      patientName,
      requiredBloodGroup,
      requiredUnits,
      location,
      phoneNumber,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Blood request created successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blood requests
exports.getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blood request by ID
exports.getBloodRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blood request (only patient name and phone number)
exports.updateBloodRequest = async (req, res) => {
  try {
    const { patientName, phoneNumber } = req.body;
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { patientName, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    res.status(200).json({
      message: "Blood request updated successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blood request
exports.deleteBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    res.status(200).json({
      message: "Blood request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get shortage alerts
exports.getShortageAlerts = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "pending" });

    const alerts = [];
    for (const request of requests) {
      const stock = await BloodStock.findOne({
        bloodGroup: request.requiredBloodGroup,
      });

      if (!stock || stock.availableUnits < request.requiredUnits) {
        alerts.push({
          patientName: request.patientName,
          bloodGroup: request.requiredBloodGroup,
          required: request.requiredUnits,
          available: stock ? stock.availableUnits : 0,
          shortage: request.requiredUnits - (stock ? stock.availableUnits : 0),
          location: request.location,
          phoneNumber: request.phoneNumber,
        });
      }
    }

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
