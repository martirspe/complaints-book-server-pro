// Modelos de datos
const { Cliente, TipoDocumento } = require('../models');

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const { t_documento_id, n_documento, email, celular } = req.body;

    // Verificar si el t_documento_id ya existe en tipos_documento
    const existingTipoDocumento = await TipoDocumento.findByPk(t_documento_id);
    if (!existingTipoDocumento) {
      return res.status(404).json({ message: "Tipo de documento no encontrado" });
    }

    // Verificar si el n_documento ya existe en otro cliente
    const existingDocumento = await Cliente.findOne({ where: { n_documento } });
    if (existingDocumento) {
      return res.status(404).json({ message: 'El número de documento ya está en uso' });
    }

    // Verificar si el email ya existe en otro cliente
    const existingEmail = await Cliente.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(404).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Verificar si el celular ya existe en otro cliente
    const existingCelular = await Cliente.findOne({ where: { celular } });
    if (existingCelular) {
      return res.status(404).json({ message: 'El número de celular ya está en uso' });
    }

    // Crea el cliente si no existen duplicados
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

    // Verificar si existen clientes registrados
    if (clientes.length === 0) {
      return res.status(404).json({ message: 'No hay clientes registrados' });
    }

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

    // Verificar si existe el cliente registrado
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
    const { n_documento, email, celular } = req.body;

    // Verificar si el cliente existe
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Verificar si el n_documento ya está en uso por otro cliente (si se envía)
    if (n_documento) {
      const existingDocumento = await Cliente.findOne({ where: { n_documento } });
      if (existingDocumento) {
        return res.status(400).json({ message: 'El número de documento ya está en uso' });
      }
    }

    // Verificar si el email ya está en uso por otro cliente (si se envía)
    if (email) {
      const existingEmail = await Cliente.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }
    }

    // Verificar si el celular ya está en uso por otro cliente (si se envía)
    if (celular) {
      const existingCelular = await Cliente.findOne({ where: { celular } });
      if (existingCelular) {
        return res.status(400).json({ message: 'El número de celular ya está en uso' });
      }
    }

    // Actualizar el cliente si no existen duplicados
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

    // Muestra un mensaje si el cliente es eliminado
    if (deleted) {
      return res.status(200).json({ message: "Cliente eliminado con éxito" });
    }

    throw new Error("Cliente no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
