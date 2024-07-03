const axios = require('axios');

exports.obtenerToken = async () => {
    try {
        const response = await axios.post('https://marrso.com/rest/V1/integration/admin/token', {
            username: 'admin',
            password: 'albz1902@M'
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener token: ', error);
        throw error;
    }
};

exports.obtenerVentas = async (token) => {
    try {
        const response = await axios.get('https://marrso.com/rest/V1/orders/2', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener ventas: ', error);
        throw error;
    }
};

exports.obtenerCliente = async (token) => {
    try {
        const response = await axios.get('https://marrso.com/rest/V1/customers/2', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener cliente: ', error);
        throw error;
    }
};

