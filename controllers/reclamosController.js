// Modelos de datos
const Reclamo = require('../models/Reclamo');
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const Tutor = require('../models/Tutor');
const TipoReclamo = require('../models/TipoReclamo');
const TipoConsumo = require('../models/TipoConsumo');

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

    const tipoReclamo = await TipoReclamo.findByPk(t_reclamo_id);
    if (!tipoReclamo) {
      return res.status(404).json({ message: "Tipo de reclamo no encontrado" });
    }

    const tipoConsumo = await TipoConsumo.findByPk(t_consumo_id);
    if (!tipoConsumo) {
      return res.status(404).json({ message: "Tipo de consumo no encontrado" });
    }

    const reclamo = await Reclamo.create({
      cliente_id,
      tutor_id,
      t_reclamo_id,
      t_consumo_id,
      ...reclamoData
    });

    // Enviar correo al crear un reclamo
    await sendEmail(
      cliente.email,
      'Nuevo Reclamo Registrado',
      `Hola ${cliente.nombres}, se ha registrado su reclamo con ID ${reclamo.id}.`,
      'nuevoReclamo',
      {
        nombreCliente: cliente.nombres,
        apellidoCliente: cliente.apellidos,
        idReclamo: reclamo.id,
        tipoReclamo: tipoReclamo.nombre,
        tipoConsumo: tipoConsumo.nombre,
        numeroPedido: reclamo.n_pedido,
        montoReclamado: reclamo.m_reclamado,
        descripcionReclamo: reclamo.descripcion,
        detalleReclamo: reclamo.detalle,
        pedidoReclamo: reclamo.pedido,
        fechaCreacion: reclamo.f_creacion
      }
    );

    res.status(201).json(reclamo);
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
        { model: TipoReclamo },
        { model: TipoConsumo }
      ]
    });

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

// Actualizar un reclamo
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
        { model: TipoReclamo },
        { model: TipoConsumo }
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
    const tipoReclamo = reclamo.TipoReclamo;
    const tipoConsumo = reclamo.TipoConsumo;

    // Enviar correo al asignar un reclamo
    await sendEmail(
      usuario.email,
      'Reclamo Asignado',
      `Hola ${usuario.nombres}, se le ha asignado el reclamo con ID ${reclamo.id}.`,
      'reclamoAsignado',
      {
        nombreAsignado: usuario.nombres,
        nombreCliente: cliente.nombres,
        apellidoCliente: cliente.apellidos,
        idReclamo: reclamo.id,
        tipoReclamo: tipoReclamo.nombre,
        tipoConsumo: tipoConsumo.nombre,
        numeroPedido: reclamo.n_pedido,
        montoReclamado: reclamo.m_reclamado,
        descripcionReclamo: reclamo.descripcion,
        detalleReclamo: reclamo.detalle,
        pedidoReclamo: reclamo.pedido,
        fechaCreacion: reclamo.f_creacion
      }
    );

    res.status(200).json(reclamo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Resolver un reclamo
exports.resolveReclamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolucion, resuelto } = req.body;

    const reclamo = await Reclamo.findByPk(id, {
      include: [
        { model: Cliente },
        { model: TipoReclamo },
        { model: TipoConsumo }
      ]
    });
    if (!reclamo) {
      return res.status(404).json({ message: 'Reclamo no encontrado' });
    }

    reclamo.resolucion = resolucion;
    reclamo.resuelto = resuelto;
    await reclamo.save();

    // Constantes para obtener los datos
    const cliente = reclamo.Cliente;
    const tipoReclamo = reclamo.TipoReclamo;
    const tipoConsumo = reclamo.TipoConsumo;

    // Enviar correo al resolver un reclamo
    await sendEmail(
      cliente.email,
      'Reclamo Resuelto',
      `Hola ${cliente.nombres}, su reclamo con ID ${reclamo.id} ha sido resuelto.`,
      'reclamoResuelto',
      {
        nombreCliente: cliente.nombres,
        apellidoCliente: cliente.apellidos,
        idReclamo: reclamo.id,
        tipoReclamo: tipoReclamo.nombre,
        tipoConsumo: tipoConsumo.nombre,
        numeroPedido: reclamo.n_pedido,
        montoReclamado: reclamo.m_reclamado,
        descripcionReclamo: reclamo.descripcion,
        detalleReclamo: reclamo.detalle,
        pedidoReclamo: reclamo.pedido,
        resolucionReclamo: reclamo.resolucion,
        fechaCreacion: reclamo.f_creacion,
        fechaResolucion: reclamo.f_resolucion
      }
    );

    res.status(200).json(reclamo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};