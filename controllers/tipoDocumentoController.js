// Modelo de datos
const { TipoDocumento } = require('../models');

// Crear un nuevo tipo de documento
exports.createTipoDocumento = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoTipoDocumento = await TipoDocumento.create({ nombre });
    res.status(201).json(nuevoTipoDocumento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los tipos de documentos
exports.getTiposDocumento = async (req, res) => {
  try {
    const tiposDocumento = await TipoDocumento.findAll();

    // Verificar si existen tipos de documento registrados
    if (tiposDocumento.length === 0) {
      return res.status(404).json({ message: 'No hay tipos de documento registrados' });
    }

    res.status(200).json(tiposDocumento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un tipo de documento por ID
exports.getTipoDocumentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoDocumento = await TipoDocumento.findByPk(id);
    if (!tipoDocumento) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.json(tipoDocumento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un tipo de documento
exports.updateTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const tipoDocumento = await TipoDocumento.findByPk(id);
    if (!tipoDocumento) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    tipoDocumento.nombre = nombre;
    await tipoDocumento.save();
    res.json(tipoDocumento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un tipo de documento
exports.deleteTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoDocumento.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Tipo de documento eliminado con éxito" });
    }
    throw new Error("Tipo de documento no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
