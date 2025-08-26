// Se enlaza el servicio
const rolService = require('../services/rolService');

const getAllRols = async (req, res) => {
    try {
        const allRols = await rolService.getAllRols();
        if (allRols) {
            res.status(200).send({ status: "OK", data: allRols });
        } else {
            res.status(400).send({ status: "FAILED", data: allRols });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const getRol = async (req, res) => {
    try {
        let id = req.params.rolId;
        const rol = await rolService.getRol(id);
        if (rol) {
            res.status(200).send({ status: "OK", data: rol });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "Rol not found" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const createRol = async (req, res) => {
    try {
        const { body } = req;
        const createdRol = await rolService.createRol(body.name, body.description);
        if (createdRol) {
            res.status(201).send({ status: "OK", data: createdRol });
        } else {
            res.status(400).send({ status: "FAILED", data: { error: "Failed to create rol" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const updateRol = async (req, res) => {
    try {
        let id = req.params.rolId;
        let { name, description } = req.body;
        const updatedRol = await rolService.updateRol(id, name, description);
        if (updatedRol) {
            res.status(200).send({ status: "OK", data: updatedRol });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "Rol not found or not updated" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const deleteRol = async (req, res) => {
    try {
        let id = req.params.rolId;
        const deletedRol = await rolService.deleteRol(id);
        if (deletedRol) {
            res.status(200).send({ status: "OK", data: deletedRol });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "Rol not found or not deleted" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

module.exports = {
    getAllRols,
    getRol,
    createRol,
    updateRol,
    deleteRol
};
