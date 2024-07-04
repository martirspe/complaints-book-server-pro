const Cliente = require('../models/Cliente');

exports.createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Cliente.update(req.body, { where: { id } });
    if (updated) {
      const updatedCliente = await Cliente.findByPk(id);
      return res.status(200).json(updatedCliente);
    }
    throw new Error("Cliente no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cliente.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Cliente no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
