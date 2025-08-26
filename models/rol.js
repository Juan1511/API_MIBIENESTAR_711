const { Rol } = require('../models');

const getAllRols = async () => {
  try {
    return await Rol.findAll();
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const getRol = async (id) => {
  try {
    return await Rol.findByPk(id);
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const createRol = async (name, description) => {
  try {
    if (!name) throw { status: 400, message: "Name is required" };
    return await Rol.create({ name, description });
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
};

const updateRol = async (id, name, description) => {
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) return null;
    await rol.update({ name: name || rol.name, description: description ?? rol.description });
    return rol;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const deleteRol = async (id) => {
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) return null;
    await rol.destroy();
    return rol;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

module.exports = {
  getAllRols,
  getRol,
  createRol,
  updateRol,
  deleteRol
};
