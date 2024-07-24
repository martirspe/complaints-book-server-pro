// Data Models
const { Tutor, DocumentType } = require('../models');

// Create a new tutor
exports.createTutor = async (req, res) => {
  try {
    const { document_type_id, document_number, email, phone } = req.body;

    // Verify if document_type_id exists in document_types
    const existingDocumentType = await DocumentType.findByPk(document_type_id);
    if (!existingDocumentType) {
      return res.status(404).json({ message: "Document type not found" });
    }

    // Verify if document_number already exists in another tutor
    const existingDocumentNumber = await Tutor.findOne({ where: { document_number } });
    if (existingDocumentNumber) {
      return res.status(400).json({ message: 'Document number is already in use' });
    }

    // Verify if email already exists in another tutor
    const existingEmail = await Tutor.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Verify if phone already exists in another tutor
    const existingPhone = await Tutor.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ message: 'Phone number is already in use' });
    }

    // Create the tutor if no duplicates exist
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tutors
exports.getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.findAll({
      include: [{ model: DocumentType }]
    });

    // Verify if there are registered tutors
    if (tutors.length === 0) {
      return res.status(404).json({ message: 'No tutors found' });
    }

    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a tutor by ID
exports.getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id, {
      include: [{ model: DocumentType }]
    });

    // Verify if the tutor exists
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tutor
exports.updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { document_number, email, phone } = req.body;

    // Verify if the tutor exists
    const tutor = await Tutor.findByPk(id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    // Verify if document_number is already in use by another tutor (if provided)
    if (document_number) {
      const existingDocumentNumber = await Tutor.findOne({ where: { document_number } });
      if (existingDocumentNumber) {
        return res.status(400).json({ message: 'Document number is already in use' });
      }
    }

    // Verify if email is already in use by another tutor (if provided)
    if (email) {
      const existingEmail = await Tutor.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    // Verify if phone is already in use by another tutor (if provided)
    if (phone) {
      const existingPhone = await Tutor.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ message: 'Phone number is already in use' });
      }
    }

    // Update the tutor if no duplicates exist
    const [updated] = await Tutor.update(req.body, { where: { id } });
    if (updated) {
      const updatedTutor = await Tutor.findByPk(id);
      return res.status(200).json(updatedTutor);
    }

    throw new Error("Tutor not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tutor
exports.deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tutor.destroy({ where: { id } });

    // Show a message if the tutor is deleted
    if (deleted) {
      return res.status(200).json({ message: "Tutor deleted successfully" });
    }

    throw new Error("Tutor not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
