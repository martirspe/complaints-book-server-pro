const Tutor = require('../models/Tutor');

exports.createTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTutores = async (req, res) => {
  try {
    const tutores = await Tutor.findAll();
    res.status(200).json(tutores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor no encontrado" });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tutor.update(req.body, { where: { id } });
    if (updated) {
      const updatedTutor = await Tutor.findByPk(id);
      return res.status(200).json(updatedTutor);
    }
    throw new Error("Tutor no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tutor.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Tutor no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
