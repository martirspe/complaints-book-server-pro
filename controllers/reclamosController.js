// Modelos de datos
const { Cliente, Tutor, TipoConsumo, TipoReclamo, Reclamo, Usuario } = require('../models');

// Utilidades
const { formatDate, prepareEmailData } = require('../utils/emailUtils');

// Servicio de correo
const sendEmail = require('../services/emailService');

// Crear un nuevo reclamo
exports.createReclamo = async (req, res) => {
  try {
    const { cliente_id, tutor_id, t_reclamo_id, t_consumo_id, ...reclamoData } = req.body;

    // Buscar todos los registros relacionados de una vez
    const [cliente, tutor, tipoConsumo, tipoReclamo] = await Promise.all([
      Cliente.findByPk(cliente_id),
      tutor_id ? Tutor.findByPk(tutor_id) : null,
      TipoConsumo.findByPk(t_consumo_id),
      TipoReclamo.findByPk(t_reclamo_id)
    ]);

    // Verificar si todos los registros necesarios existen
    if (!cliente || !tipoConsumo || !tipoReclamo || (tutor_id && !tutor)) {
      return res.status(404).json({ message: 'Uno o más registros relacionados no fueron encontrados' });
    }

    // Manejar el archivo adjunto
    if (req.fileInfo) {
      reclamoData.a_adjunto = req.fileInfo.filePath;
    }

    // Crear el reclamo
    const reclamo = await Reclamo.create({
      cliente_id,
      tutor_id,
      t_consumo_id,
      t_reclamo_id,
      ...reclamoData
    });

    // Generar código de reclamo
    const currentYear = new Date().getFullYear();
    const prefix = tipoReclamo.nombre.substring(0, 3).toUpperCase();
    reclamo.codigo = `${prefix}${currentYear}${reclamo.id}`;
    await reclamo.save();

    // Recargar el reclamo con las relaciones para preparar los datos del email
    const reclamoCompleto = await Reclamo.findByPk(reclamo.id, {
      include: [{ model: Cliente }, { model: TipoConsumo }, { model: TipoReclamo }]
    });

    // Preparar datos para el envío de correo
    const emailData = {
      ...prepareEmailData(reclamoCompleto),
      fechaCreacion: formatDate(reclamoCompleto.f_creacion)
    };

    // Preparar adjuntos para el correo
    const attachments = req.fileInfo ? [{ filename: req.file.originalname, path: req.fileInfo.filePath }] : [];

    // Enviar correo al crear un reclamo
    await sendEmail(
      cliente.email,
      'Nuevo Reclamo Registrado',
      `Hola ${cliente.nombres}, se ha registrado su reclamo con el código: ${reclamo.codigo}.`,
      'nuevoReclamo',
      emailData,
      attachments
    );

    res.status(201).json({
      message: 'Su reclamo ha sido registrado',
      fileInfo: req.fileInfo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los reclamos
exports.getReclamos = async (req, res) => {
  try {
    const reclamos = await Reclamo.findAll({
      include: [{ model: Cliente }, { model: Tutor }, { model: TipoConsumo }, { model: TipoReclamo }]
    });

    // Verificar si existen reclamos registrados
    if (reclamos.length === 0) {
      return res.status(404).json({ message: 'No hay reclamos registrados' });
    }

    res.status(200).json(reclamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un reclamo por ID
exports.getReclamoById = async (req, res) => {
  try {
    const reclamo = await Reclamo.findByPk(req.params.id, {
      include: [{ model: Cliente }, { model: Tutor }, { model: TipoConsumo }, { model: TipoReclamo }]
    });

    if (!reclamo) {
      return res.status(404).json({ message: 'Reclamo no encontrado' });
    }

    res.status(200).json(reclamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un reclamo
exports.updateReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const reclamoData = req.body;

    // Manejar el archivo adjunto
    if (req.fileInfo) {
      reclamoData.a_adjunto = req.fileInfo.filePath;
    }

    const [updated] = await Reclamo.update(reclamoData, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Reclamo no encontrado" });
    }

    const updatedReclamo = await Reclamo.findByPk(id, {
      include: [{ model: Cliente }, { model: TipoConsumo }, { model: TipoReclamo }]
    });

    const emailData = {
      ...prepareEmailData(updatedReclamo),
      fechaActualizacion: formatDate(updatedReclamo.f_actualizacion)
    };

    // Preparar adjuntos para el correo
    const attachments = req.file ? [{ filename: req.file.originalname, path: req.file.path }] : [];

    // Enviar correo al actualizar un reclamo
    await sendEmail(
      updatedReclamo.Cliente.email,
      'Reclamo Actualizado',
      `Hola ${updatedReclamo.Cliente.nombres}, su reclamo con el código: ${updatedReclamo.codigo} ha sido actualizado.`,
      'reclamoActualizado',
      emailData,
      attachments
    );

    return res.status(200).json({
      message: 'Su reclamo ha sido actualizado',
      fileInfo: req.fileInfo
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un reclamo
exports.deleteReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reclamo.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: 'Reclamo eliminado con éxito' });
    }
    throw new Error('Reclamo no encontrado');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Asignar un reclamo
exports.assignReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { u_asignado } = req.body;

    // Buscar el reclamo y el usuario asignado simultáneamente
    const [reclamo, usuario] = await Promise.all([
      Reclamo.findByPk(id, {
        include: [{ model: Cliente }, { model: TipoConsumo }, { model: TipoReclamo }]
      }),
      Usuario.findByPk(u_asignado)
    ]);

    if (!reclamo) {
      return res.status(404).json({ message: 'Reclamo no encontrado' });
    }

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    reclamo.u_asignado = u_asignado;
    await reclamo.save();

    // Preparar datos para el envío de correo
    const emailData = {
      ...prepareEmailData(reclamo),
      nombreAsignado: usuario.nombres,
      fechaCreacion: formatDate(reclamo.f_creacion),
      fechaAsignacion: formatDate(new Date())
    };

    // Enviar correo al asignar un reclamo
    await sendEmail(
      usuario.email,
      'Reclamo Asignado',
      `Hola ${usuario.nombres}, se le ha asignado el reclamo con el código: ${reclamo.codigo}.`,
      'reclamoAsignado',
      emailData
    );

    res.status(200).json({
      message: `El reclamo ha sido asignado a ${usuario.nombres}`,
      assignedUser: {
        id: usuario.id,
        nombre: usuario.nombres
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Resolver un reclamo
exports.resolveReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuesta, resuelto } = req.body;

    const reclamo = await Reclamo.findByPk(id, {
      include: [{ model: Cliente }, { model: TipoConsumo }, { model: TipoReclamo }]
    });

    if (!reclamo) {
      return res.status(404).json({ message: 'Reclamo no encontrado' });
    }

    reclamo.respuesta = respuesta;
    reclamo.resuelto = resuelto;
    reclamo.f_respuesta = new Date(); // Asegúrate de establecer la fecha de respuesta

    // Manejar archivo adjunto
    if (req.fileInfo) {
      reclamo.r_adjunto = req.fileInfo.filePath;
    }

    await reclamo.save();

    // Preparar datos para el envío de correo
    const emailData = {
      ...prepareEmailData(reclamo),
      respuestaReclamo: reclamo.respuesta,
      fechaCreacion: formatDate(reclamo.f_creacion),
      fechaRespuesta: formatDate(reclamo.f_respuesta)
    };

    // Preparar adjuntos para el correo
    const attachments = req.fileInfo ? [{ filename: req.file.originalname, path: req.fileInfo.filePath }] : [];

    // Enviar correo al resolver un reclamo
    await sendEmail(
      reclamo.Cliente.email,
      'Reclamo Resuelto',
      `Hola ${reclamo.Cliente.nombres}, su reclamo con el código: ${reclamo.codigo} ha sido resuelto.`,
      'reclamoResuelto',
      emailData,
      attachments
    );

    res.status(200).json({
      message: 'Su reclamo ha sido resuelto',
      fileInfo: req.fileInfo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};