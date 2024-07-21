// Biblioteca para formatear fecha
const moment = require('moment');

// Modelos de datos
const Reclamo = require('../models/Reclamo');
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const Tutor = require('../models/Tutor');
const TipoConsumo = require('../models/TipoConsumo');
const TipoReclamo = require('../models/TipoReclamo');

// Servicio de correo
const sendEmail = require('../services/emailService');

// Crear un nuevo reclamo
exports.createReclamo = async (req, res) => {
  try {
    const { cliente_id, tutor_id, t_reclamo_id, t_consumo_id, ...reclamoData } = req.body;

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

    const tipoConsumo = await TipoConsumo.findByPk(t_consumo_id);
    if (!tipoConsumo) {
      return res.status(404).json({ message: "Tipo de consumo no encontrado" });
    }

    const tipoReclamo = await TipoReclamo.findByPk(t_reclamo_id);
    if (!tipoReclamo) {
      return res.status(404).json({ message: "Tipo de reclamo no encontrado" });
    }

    // Manejo del archivo adjunto
    if (req.file) {
      reclamoData.a_adjunto = req.file.path;
    }

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
    const codigoReclamo = `${prefix}${currentYear}${reclamo.id}`;
    reclamo.codigo = codigoReclamo;
    await reclamo.save();

    // Formatear la fecha
    const fechaFormateada = moment(reclamo.f_creacion).format('DD/MM/YYYY - hh:mmA');

    // Preparar adjuntos para el correo
    const attachments = req.file ? [{ filename: req.file.originalname, path: req.file.path }] : [];

    // Enviar correo al crear un reclamo
    await sendEmail(
      cliente.email,
      'Nuevo Reclamo Registrado',
      `Hola ${cliente.nombres}, se ha registrado su reclamo con el código: ${reclamo.codigo}.`,
      'nuevoReclamo',
      {
        codigoReclamo: reclamo.codigo,
        nombreCliente: cliente.nombres,
        apellidoCliente: cliente.apellidos,
        tipoConsumo: tipoConsumo.nombre,
        tipoReclamo: tipoReclamo.nombre,
        numeroPedido: reclamo.n_pedido,
        montoReclamado: reclamo.m_reclamado,
        descripcionReclamo: reclamo.descripcion,
        detalleReclamo: reclamo.detalle,
        pedidoReclamo: reclamo.pedido,
        fechaCreacion: fechaFormateada
      },
      attachments
    );

    res.status(201).json({ message: "Su reclamo ha sido registrado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los reclamos
exports.getReclamos = async (req, res) => {
  try {
    const reclamos = await Reclamo.findAll({
      include: [
        { model: Cliente },
        { model: Tutor },
        { model: TipoConsumo },
        { model: TipoReclamo }
      ]
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
      include: [
        { model: Cliente },
        { model: Tutor },
        { model: TipoConsumo },
        { model: TipoReclamo }
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

// Actualizar un reclamo
exports.updateReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const reclamoData = req.body;

    // Manejo del archivo adjunto
    if (req.file) {
      reclamoData.a_adjunto = req.file.path;
    }

    const [updated] = await Reclamo.update(reclamoData, { where: { id } });
    if (updated) {
      const updatedReclamo = await Reclamo.findByPk(id, {
        include: [Cliente, TipoReclamo, TipoConsumo]
      });

      // Constantes para obtener los datos
      const cliente = updatedReclamo.Cliente;
      const tipoConsumo = updatedReclamo.TipoConsumo;
      const tipoReclamo = updatedReclamo.TipoReclamo;

      // Formatear la fecha
      const fechaFormateada = moment(updatedReclamo.f_actualizacion).format('DD/MM/YYYY - hh:mmA');

      // Preparar adjuntos para el correo
      const attachments = req.file ? [{ filename: req.file.originalname, path: req.file.path }] : [];

      // Enviar correo al actualizar un reclamo
      await sendEmail(
        cliente.email,
        'Reclamo Actualizado',
        `Hola ${cliente.nombres}, su reclamo con el código: ${updatedReclamo.codigo} ha sido actualizado.`,
        'reclamoActualizado',
        {
          codigoReclamo: updatedReclamo.codigo,
          nombreCliente: cliente.nombres,
          apellidoCliente: cliente.apellidos,
          tipoConsumo: tipoConsumo.nombre,
          tipoReclamo: tipoReclamo.nombre,
          numeroPedido: updatedReclamo.n_pedido,
          montoReclamado: updatedReclamo.m_reclamado,
          descripcionReclamo: updatedReclamo.descripcion,
          detalleReclamo: updatedReclamo.detalle,
          pedidoReclamo: updatedReclamo.pedido,
          fechaActualizacion: fechaFormateada
        },
        attachments
      );

      return res.status(200).json({ message: "Su reclamo ha sido actualizado" });
    }

    throw new Error("Reclamo no encontrado");
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
      return res.status(200).json({ message: "Reclamo eliminado con éxito" });
    }
    throw new Error("Reclamo no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Asignar un reclamo
exports.assignReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { u_asignado } = req.body;

    const reclamo = await Reclamo.findByPk(id, {
      include: [
        { model: Cliente },
        { model: TipoConsumo },
        { model: TipoReclamo }
      ]
    });
    if (!reclamo) {
      return res.status(404).json({ message: 'Reclamo no encontrado' });
    }

    const usuario = await Usuario.findByPk(u_asignado);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    reclamo.u_asignado = u_asignado;
    await reclamo.save();

    // Constantes para obtener los datos
    const cliente = reclamo.Cliente;
    const tipoConsumo = reclamo.TipoConsumo;
    const tipoReclamo = reclamo.TipoReclamo;

    // Formatear la fecha
    const fechaFormateada = moment(reclamo.f_creacion).format('DD/MM/YYYY - hh:mmA');

    // Enviar correo al asignar un reclamo
    await sendEmail(
      usuario.email,
      'Reclamo Asignado',
      `Hola ${usuario.nombres}, se le ha asignado el reclamo con el código: ${reclamo.codigo}.`,
      'reclamoAsignado',
      {
        codigoReclamo: reclamo.codigo,
        nombreAsignado: usuario.nombres,
        nombreCliente: cliente.nombres,
        apellidoCliente: cliente.apellidos,
        tipoConsumo: tipoConsumo.nombre,
        tipoReclamo: tipoReclamo.nombre,
        numeroPedido: reclamo.n_pedido,
        montoReclamado: reclamo.m_reclamado,
        descripcionReclamo: reclamo.descripcion,
        detalleReclamo: reclamo.detalle,
        pedidoReclamo: reclamo.pedido,
        fechaCreacion: fechaFormateada
      }
    );

    res.status(200).json({ message: `Su reclamo ha sido asignado a ${usuario.nombres}` });
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
      include: [
        { model: Cliente },
        { model: TipoConsumo },
        { model: TipoReclamo }
      ]
    });
    if (!reclamo) {
      return res.status(404).json({ message: 'Reclamo no encontrado' });
    }

    reclamo.respuesta = respuesta;
    reclamo.resuelto = resuelto;

    // Manejar archivo adjunto
    if (req.file) {
      reclamo.r_adjunto = req.file.path;
    }

    await reclamo.save();

    // Constantes para obtener los datos
    const cliente = reclamo.Cliente;
    const tipoConsumo = reclamo.TipoConsumo;
    const tipoReclamo = reclamo.TipoReclamo;

    // Formatear la fecha
    const fechaFormateada = moment(reclamo.f_respuesta).format('DD/MM/YYYY - hh:mmA');

    // Preparar adjuntos para el correo
    const attachments = req.file ? [{ filename: req.file.originalname, path: req.file.path }] : [];

    // Enviar correo al resolver un reclamo
    await sendEmail(
      cliente.email,
      'Reclamo Resuelto',
      `Hola ${cliente.nombres}, su reclamo con el código: ${reclamo.codigo} ha sido resuelto.`,
      'reclamoResuelto',
      {
        codigoReclamo: reclamo.codigo,
        nombreCliente: cliente.nombres,
        apellidoCliente: cliente.apellidos,
        tipoConsumo: tipoConsumo.nombre,
        tipoReclamo: tipoReclamo.nombre,
        numeroPedido: reclamo.n_pedido,
        montoReclamado: reclamo.m_reclamado,
        descripcionReclamo: reclamo.descripcion,
        detalleReclamo: reclamo.detalle,
        pedidoReclamo: reclamo.pedido,
        respuestaReclamo: reclamo.respuesta,
        fechaCreacion: reclamo.f_creacion,
        fechaRespuesta: fechaFormateada
      },
      attachments
    );

    res.status(200).json({ message: `Su reclamo ha sido resuelto` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};