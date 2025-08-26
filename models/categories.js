const { categories, events } = require('../models');

const getAllCategories = async () => {
  try {
    return await categories.findAll({ include: [{ model: events, as: 'events' }] });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const getCategorie = async (id) => {
  try {
    return await categories.findByPk(id, { include: [{ model: events, as: 'events' }] });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const createCategorie = async (data) => {
  try {
    const { name, description, image } = data;

    if (!name) throw { status: 400, message: "Name is required" };

    return await categories.create({
      name,
      description,
      image
    });
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
};

const updateCategorie = async (id, data) => {
  try {
    const categorie = await categories.findByPk(id);
    if (!categorie) return null;

    await categorie.update(data);
    return categorie;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const deleteCategorie = async (id) => {
  try {
    const categorie = await categories.findByPk(id);
    if (!categorie) return null;
    await categorie.destroy();
    return categorie;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

module.exports = {
  getAllCategories,
  getCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie
};
