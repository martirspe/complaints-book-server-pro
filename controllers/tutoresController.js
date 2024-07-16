// Modelos de datos
const Tutor = require('../models/Tutor');
const TipoDocumento = require('../models/TipoDocumento');

// Crear un nuevo tutor
exports.createTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los tutores
exports.getTutores = async (req, res) => {
  try {
    const tutores = await Tutor.findAll({
      include: [
        { model: TipoDocumento }
      ]
    });
    res.status(200).json(tutores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un tutor por ID
exports.getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id, {
      include: [
        { model: TipoDocumento }
      ]
    });
    if (!tutor) {
      return res.status(404).json({ message: "Tutor no encontrado" });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un tutor
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

// Eliminar un tutor
exports.deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tutor.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Tutor eliminado con éxito" });
    }
    throw new Error("Tutor no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
