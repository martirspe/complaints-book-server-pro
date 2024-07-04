const TipoConsumo = require('../models/TipoConsumo');

exports.createTipoConsumo = async (req, res) => {
  try {
    const tipoConsumo = await TipoConsumo.create(req.body);
    res.status(201).json(tipoConsumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTiposConsumo = async (req, res) => {
  try {
    const tiposConsumo = await TipoConsumo.findAll();
    res.status(200).json(tiposConsumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.deleteTipoConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoConsumo.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Tipo de consumo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
