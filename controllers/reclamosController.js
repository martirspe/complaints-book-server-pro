const Reclamo = require('../models/Reclamo');
const Cliente = require('../models/Cliente');
const Tutor = require('../models/Tutor');
const TipoReclamo = require('../models/TipoReclamo');
const TipoConsumo = require('../models/TipoConsumo');

exports.createReclamo = async (req, res) => {
  try {
    const { cliente_id, tutor_id, tipo_reclamo_id, tipo_consumo_id, ...reclamoData } = req.body;

    const cliente = await Cliente.findByPk(cliente_id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    if (tutor_id) {
      const tutor = await Tutor.findByPk(tutor_id);
      if (!tutor) {
        return res.status(404).json({ message: "Tutor no encontrado" });
      }
    }

    const tipoReclamo = await TipoReclamo.findByPk(tipo_reclamo_id);
    if (!tipoReclamo) {
      return res.status(404).json({ message: "Tipo de reclamo no encontrado" });
    }

    const tipoConsumo = await TipoConsumo.findByPk(tipo_consumo_id);
    if (!tipoConsumo) {
      return res.status(404).json({ message: "Tipo de consumo no encontrado" });
    }

    const reclamo = await Reclamo.create({
      cliente_id,
      tutor_id,
      tipo_reclamo_id,
      tipo_consumo_id,
      ...reclamoData
    });

    res.status(201).json(reclamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReclamos = async (req, res) => {
  try {
    const reclamos = await Reclamo.findAll({
      include: [
        { model: Cliente },
        { model: Tutor },
        { model: TipoReclamo },
        { model: TipoConsumo }
      ]
    });

    res.status(200).json(reclamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReclamoById = async (req, res) => {
  try {
    const reclamo = await Reclamo.findByPk(req.params.id, {
      include: [
        { model: Cliente },
        { model: Tutor },
        { model: TipoReclamo },
        { model: TipoConsumo }
      ]
    });

    if (!reclamo) {
      return res.status(404).json({ message: "Reclamo no encontrado" });
    }

    res.status(200).json(reclamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Reclamo.update(req.body, { where: { id } });
    if (updated) {
      const updatedReclamo = await Reclamo.findByPk(id);
      return res.status(200).json(updatedReclamo);
    }
    throw new Error("Reclamo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reclamo.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Reclamo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
