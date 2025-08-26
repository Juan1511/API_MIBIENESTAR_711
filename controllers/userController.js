// Se enlaza el servicio
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        if (allUsers) {
            res.status(200).send({ status: "OK", data: allUsers });
        } else {
            res.status(400).send({ status: "FAILED", data: allUsers });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const getUser = async (req, res) => {
    try {
        let id = req.params.userId;
        const user = await userService.getUser(id);
        if (user) {
            res.status(200).send({ status: "OK", data: user });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "User not found" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const createUser = async (req, res) => {
    try {
        const { body } = req;
        const createdUser = await userService.createUser(body);
        if (createdUser) {
            res.status(201).send({ status: "OK", data: createdUser });
        } else {
            res.status(400).send({ status: "FAILED", data: { error: "Failed to create user" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const updateUser = async (req, res) => {
    try {
        let id = req.params.userId;
        let body = req.body;
        const updatedUser = await userService.updateUser(id, body);
        if (updatedUser) {
            res.status(200).send({ status: "OK", data: updatedUser });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "User not found or not updated" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const deleteUser = async (req, res) => {
    try {
        let id = req.params.userId;
        const deletedUser = await userService.deleteUser(id);
        if (deletedUser) {
            res.status(200).send({ status: "OK", data: deletedUser });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "User not found or not deleted" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
