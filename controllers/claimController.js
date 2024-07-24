// Data Models
const { User, Customer, Tutor, ConsumptionType, ClaimType, Claim } = require('../models');

// Utilities
const { formatDate, prepareEmailData } = require('../utils/emailUtils');

// Email Service
const sendEmail = require('../services/emailService');

// Create a new claim
exports.createClaim = async (req, res) => {
  try {
    const { customer_id, tutor_id, claim_type_id, consumption_type_id, ...claimData } = req.body;

    // Find all related records at once
    const [customer, tutor, consumptionType, claimType] = await Promise.all([
      Customer.findByPk(customer_id),
      tutor_id ? Tutor.findByPk(tutor_id) : null,
      ConsumptionType.findByPk(consumption_type_id),
      ClaimType.findByPk(claim_type_id)
    ]);

    // Check if all necessary records exist
    if (!customer || !consumptionType || !claimType || (tutor_id && !tutor)) {
      return res.status(404).json({ message: 'One or more related records were not found' });
    }

    // Handle attachment
    if (req.fileInfo) {
      claimData.attachment = req.fileInfo.filePath;
    }

    // Create the claim
    const claim = await Claim.create({
      customer_id,
      tutor_id,
      consumption_type_id,
      claim_type_id,
      ...claimData
    });

    // Generate claim code
    const currentYear = new Date().getFullYear();
    const prefix = claimType.name.substring(0, 3).toUpperCase();
    claim.code = `${prefix}${currentYear}${claim.id}`;
    await claim.save();

    // Reload the claim with relations to prepare email data
    const completeClaim = await Claim.findByPk(claim.id, {
      include: [{ model: Customer }, { model: ConsumptionType }, { model: ClaimType }]
    });

    // Prepare data for email sending
    const emailData = {
      ...prepareEmailData(completeClaim),
      creationDate: formatDate(completeClaim.creation_date)
    };

    // Prepare attachments for email
    const attachments = req.fileInfo ? [{ filename: req.file.originalname, path: req.fileInfo.filePath }] : [];

    // Send email when creating a claim
    await sendEmail(
      customer.email,
      'Nuevo Reclamo Registrado',
      `Hola ${customer.first_name}, se ha registrado su reclamo con el código: ${claim.code}.`,
      'newClaim',
      emailData,
      attachments
    );

    res.status(201).json({
      message: 'Your claim has been registered',
      fileInfo: req.fileInfo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all claims
exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll({
      include: [{ model: Customer }, { model: Tutor }, { model: ConsumptionType }, { model: ClaimType }]
    });

    // Check if there are registered claims
    if (claims.length === 0) {
      return res.status(404).json({ message: 'No registered claims' });
    }

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a claim by ID
exports.getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findByPk(req.params.id, {
      include: [{ model: Customer }, { model: Tutor }, { model: ConsumptionType }, { model: ClaimType }]
    });

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a claim
exports.updateClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const claimData = req.body;

    // Handle attachment
    if (req.fileInfo) {
      claimData.attachment = req.fileInfo.filePath;
    }

    const [updated] = await Claim.update(claimData, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Claim not found" });
    }

    const updatedClaim = await Claim.findByPk(id, {
      include: [{ model: Customer }, { model: ConsumptionType }, { model: ClaimType }]
    });

    const emailData = {
      ...prepareEmailData(updatedClaim),
      updateDate: formatDate(updatedClaim.update_date)
    };

    // Prepare attachments for email
    const attachments = req.file ? [{ filename: req.file.originalname, path: req.file.path }] : [];

    // Send email when updating a claim
    await sendEmail(
      updatedClaim.Customer.email,
      'Reclamo Actualizado',
      `Hola ${updatedClaim.Customer.first_name}, su reclamo con el código: ${updatedClaim.code} ha sido actualizado.`,
      'updatedClaim',
      emailData,
      attachments
    );

    return res.status(200).json({
      message: 'Your claim has been updated',
      fileInfo: req.fileInfo
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a claim
exports.deleteClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Claim.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: 'Claim successfully deleted' });
    }
    throw new Error('Claim not found');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a claim
exports.assignClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_user } = req.body;

    // Find the claim and assigned user simultaneously
    const [claim, user] = await Promise.all([
      Claim.findByPk(id, {
        include: [{ model: Customer }, { model: ConsumptionType }, { model: ClaimType }]
      }),
      User.findByPk(assigned_user)
    ]);

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    claim.assigned_user = assigned_user;
    await claim.save();

    // Prepare data for email sending
    const emailData = {
      ...prepareEmailData(claim),
      assignedName: user.first_name,
      creationDate: formatDate(claim.creation_date),
      assignmentDate: formatDate(new Date())
    };

    // Send email when assigning a claim
    await sendEmail(
      user.email,
      'Reclamo Asignado',
      `Hola ${user.first_name}, se le ha asignado el reclamo con el código: ${claim.code}.`,
      'claimAssigned',
      emailData,
    );

    res.status(200).json({
      message: `The claim has been assigned to: ${user.first_name} ${user.last_name}`,
      assignedUser: {
        id: user.id,
        name: user.first_name
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Resolve a claim
exports.resolveClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, resolved } = req.body;

    const claim = await Claim.findByPk(id, {
      include: [{ model: Customer }, { model: ConsumptionType }, { model: ClaimType }]
    });

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.response = response;
    claim.resolved = resolved;
    claim.response_date = new Date(); // Make sure to set the response date

    // Handle attachment
    if (req.fileInfo) {
      claim.response_attachment = req.fileInfo.filePath;
    }

    await claim.save();

    // Prepare data for email sending
    const emailData = {
      ...prepareEmailData(claim),
      claimResponse: claim.response,
      creationDate: formatDate(claim.creation_date),
      responseDate: formatDate(claim.response_date)
    };

    // Prepare attachments for email
    const attachments = req.fileInfo ? [{ filename: req.file.originalname, path: req.fileInfo.filePath }] : [];

    // Send email when resolving a claim
    await sendEmail(
      claim.Customer.email,
      'Reclamo Resuelto',
      `Hola ${claim.Customer.first_name}, su reclamo con el código: ${claim.code} ha sido resuelto.`,
      'claimResolved',
      emailData,
      attachments
    );

    res.status(200).json({
      message: 'Your claim has been resolved',
      fileInfo: req.fileInfo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};