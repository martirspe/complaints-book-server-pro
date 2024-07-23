// Modelos de datos
const { Tutor, TipoDocumento } = require('../models');

// Crear un nuevo tutor
exports.createTutor = async (req, res) => {
  try {
    const { t_documento_id, n_documento, email, celular } = req.body;

    // Verificar si el t_documento_id ya existe en tipos_documento
    const existingTipoDocumento = await TipoDocumento.findByPk(t_documento_id);
    if (!existingTipoDocumento) {
      return res.status(404).json({ message: "Tipo de documento no encontrado" });
    }

    // Verificar si el n_documento ya existe en otro tutor
    const existingDocumento = await Tutor.findOne({ where: { n_documento } });
    if (existingDocumento) {
      return res.status(400).json({ message: 'El número de documento ya está en uso' });
    }

    // Verificar si el email ya existe en otro tutor
    const existingEmail = await Tutor.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Verificar si el celular ya existe en otro tutor
    const existingCelular = await Tutor.findOne({ where: { celular } });
    if (existingCelular) {
      return res.status(400).json({ message: 'El número de celular ya está en uso' });
    }

    // Crea el tutor si no existen duplicados
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

    // Verificar si existen tutores registrados
    if (tutores.length === 0) {
      return res.status(404).json({ message: 'No hay tutores registrados' });
    }

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

    // Verificar si existe el tutor registrado
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
    const { n_documento, email, celular } = req.body;

    // Verificar si el cliente existe
    const tutor = await Tutor.findByPk(id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor no encontrado' });
    }

    // Verificar si el n_documento ya está en uso por otro tutor (si se envía)
    if (n_documento) {
      const existingDocumento = await Tutor.findOne({ where: { n_documento } });
      if (existingDocumento) {
        return res.status(400).json({ message: 'El número de documento ya está en uso' });
      }
    }

    // Verificar si el email ya está en uso por otro tutor (si se envía)
    if (email) {
      const existingEmail = await Tutor.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }
    }

    // Verificar si el celular ya está en uso por otro tutor (si se envía)
    if (celular) {
      const existingCelular = await Tutor.findOne({ where: { celular } });
      if (existingCelular) {
        return res.status(400).json({ message: 'El número de celular ya está en uso' });
      }
    }

    // Actualizar el tutor si no existen duplicados
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

    // Muestra un mensaje si el tutor es eliminado
    if (deleted) {
      return res.status(200).json({ message: "Tutor eliminado con éxito" });
    }

    throw new Error("Tutor no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
