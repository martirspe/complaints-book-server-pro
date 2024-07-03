const Reclamo = require('../models/Reclamo');

exports.crearReclamo = async (req, res) => {
    try {
        const nuevoReclamo = await Reclamo.create(req.body);
        res.status(201).json(nuevoReclamo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.obtenerReclamosPorID = async (req, res) => {
    try {
        const reclamos = await Reclamo.findOne({ where: { id: req.params.id } });
        res.status(200).json(reclamos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.obtenerReclamos = async (req, res) => {
    try {
        const reclamos = await Reclamo.findAll();
        res.status(200).json(reclamos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.actualizarReclamo = async (req, res) => {
    try {
        const [updated] = await Reclamo.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedReclamo = await Reclamo.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedReclamo);
        } else {
            res.status(404).json({ message: 'Reclamo no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.asignarReclamo = async (req, res) => {
    try {
        const [updated] = await Reclamo.update(
            { asignadoA: req.body.asignadoA },
            { where: { id: req.params.id }
        });
        if (updated) {
            const updatedReclamo = await Reclamo.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedReclamo);
        } else {
            res.status(404).json({ message: 'Reclamo no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.resolverReclamo = async (req, res) => {
    try {
        const [updated] = await Reclamo.update(
            { resolucion: req.body.resolucion, resuelto: 1 },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedReclamo = await Reclamo.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedReclamo);
        } else {
            res.status(404).json({ message: 'Reclamo no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
