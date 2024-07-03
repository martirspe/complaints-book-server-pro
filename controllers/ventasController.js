const axios = require('axios');
const magentoService = require('../services/magentoService');

exports.obtenerVentas = async (req, res) => {
    try {
        const token = await magentoService.obtenerToken();
        const ventas = await magentoService.obtenerVentas(token);
        res.status(200).json(ventas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.obtenerCliente = async (req, res) => {
    try {
        const token = await magentoService.obtenerToken();
        const cliente = await magentoService.obtenerCliente(token);
        res.status(200).json(cliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
