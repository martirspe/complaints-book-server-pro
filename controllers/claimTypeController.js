// Data Model
const { ClaimType } = require('../models');

// Create a new claim type
exports.createClaimType = async (req, res) => {
  try {
    const claimType = await ClaimType.create(req.body);
    res.status(201).json(claimType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all claim types
exports.getClaimTypes = async (req, res) => {
  try {
    const claimTypes = await ClaimType.findAll();

    // Check if there are registered claim types
    if (claimTypes.length === 0) {
      return res.status(404).json({ message: 'No registered claim types' });
    }

    res.status(200).json(claimTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a claim type by ID
exports.getClaimTypeById = async (req, res) => {
  try {
    const claimType = await ClaimType.findByPk(req.params.id);
    if (!claimType) {
      return res.status(404).json({ message: "Claim type not found" });
    }
    res.status(200).json(claimType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a claim type
exports.updateClaimType = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await ClaimType.update(req.body, { where: { id } });
    if (updated) {
      const updatedClaimType = await ClaimType.findByPk(id);
      return res.status(200).json(updatedClaimType);
    }
    throw new Error("Claim type not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a claim type
exports.deleteClaimType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ClaimType.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Claim type successfully deleted" });
    }
    throw new Error("Claim type not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};