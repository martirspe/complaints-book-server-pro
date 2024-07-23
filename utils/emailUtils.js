const moment = require('moment');

exports.formatDate = (date) => moment(date).format('DD/MM/YYYY - hh:mmA');

exports.prepareEmailData = (reclamo) => {
  const { 
    codigo,
    n_pedido,
    m_reclamado,
    descripcion,
    detalle,
    pedido,
    Cliente,
    TipoConsumo,
    TipoReclamo
  } = reclamo;

  return {
    codigoReclamo: codigo,
    nombreCliente: Cliente.nombres,
    apellidoCliente: Cliente.apellidos,
    tipoConsumo: TipoConsumo.nombre,
    tipoReclamo: TipoReclamo.nombre,
    numeroPedido: n_pedido,
    montoReclamado: m_reclamado,
    descripcionReclamo: descripcion,
    detalleReclamo: detalle,
    pedidoReclamo: pedido,
  };
};