const TipoReclamo = require('../models/TipoReclamo');

exports.createTipoReclamo = async (req, res) => {
  try {
    const tipoReclamo = await TipoReclamo.create(req.body);
    res.status(201).json(tipoReclamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTiposReclamo = async (req, res) => {
  try {
    const tiposReclamo = await TipoReclamo.findAll();
    res.status(200).json(tiposReclamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTipoReclamoById = async (req, res) => {
  try {
    const tipoReclamo = await TipoReclamo.findByPk(req.params.id);
    if (!tipoReclamo) {
      return res.status(404).json({ message: "Tipo de reclamo no encontrado" });
    }
    res.status(200).json(tipoReclamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTipoReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await TipoReclamo.update(req.body, { where: { id } });
    if (updated) {
      const updatedTipoReclamo = await TipoReclamo.findByPk(id);
      return res.status(200).json(updatedTipoReclamo);
    }
    throw new Error("Tipo de reclamo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTipoReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoReclamo.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Tipo de reclamo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
