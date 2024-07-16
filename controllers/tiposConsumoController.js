// Modelo de datos
const TipoConsumo = require('../models/TipoConsumo');

// Crear un nuevo tipo de consumo
exports.createTipoConsumo = async (req, res) => {
  try {
    const tipoConsumo = await TipoConsumo.create(req.body);
    res.status(201).json(tipoConsumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los tipos de consumo
exports.getTiposConsumo = async (req, res) => {
  try {
    const tiposConsumo = await TipoConsumo.findAll();
    res.status(200).json(tiposConsumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un tipo de consumo por ID
exports.getTipoConsumoById = async (req, res) => {
  try {
    const tipoConsumo = await TipoConsumo.findByPk(req.params.id);
    if (!tipoConsumo) {
      return res.status(404).json({ message: "Tipo de consumo no encontrado" });
    }
    res.status(200).json(tipoConsumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un tipo de consumo
exports.updateTipoConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await TipoConsumo.update(req.body, { where: { id } });
    if (updated) {
      const updatedTipoConsumo = await TipoConsumo.findByPk(id);
      return res.status(200).json(updatedTipoConsumo);
    }
    throw new Error("Tipo de consumo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un tipo de consumo
exports.deleteTipoConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoConsumo.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Tipo de consumo eliminado con éxito" });
    }
    throw new Error("Tipo de consumo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
