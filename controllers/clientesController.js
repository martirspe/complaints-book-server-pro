// Modelos de datos
const Cliente = require('../models/Cliente');
const TipoDocumento = require('../models/TipoDocumento');

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        { model: TipoDocumento }
      ]
    });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      include: [
        { model: TipoDocumento }
      ]
    });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un cliente
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

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cliente.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Cliente eliminado con éxito" });
    }
    throw new Error("Cliente no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
