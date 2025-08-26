const { events, categories, User } = require('../models');

const getAllEvents = async () => {
  try {
    return await events.findAll({
      include: [
        { model: categories, as: 'category' },
        { model: User, as: 'user' }
      ]
    });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const getEvent = async (id) => {
  try {
    return await events.findByPk(id, {
      include: [
        { model: categories, as: 'category' },
        { model: User, as: 'user' }
      ]
    });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const createEvent = async (data) => {
  try {
    const { name, description, starDate, endDate, categoryId, state, maxCapacity, userId } = data;

    if (!name || !categoryId || !userId) {
      throw { status: 400, message: "Required fields: name, categoryId, userId" };
    }

    // Verificar categoría
    const category = await categories.findByPk(categoryId);
    if (!category) throw { status: 400, message: "Specified category does not exist" };

    // Verificar usuario
    const user = await User.findByPk(userId);
    if (!user) throw { status: 400, message: "Specified user does not exist" };

    return await events.create({
      name,
      description,
      starDate,
      endDate,
      categoryId,
      state: state ?? true,
      maxCapacity,
      userId
    });
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
};

const updateEvent = async (id, data) => {
  try {
    const event = await events.findByPk(id);
    if (!event) return null;

    if (data.categoryId) {
      const category = await categories.findByPk(data.categoryId);
      if (!category) throw { status: 400, message: "Specified category does not exist" };
    }

    if (data.userId) {
      const user = await User.findByPk(data.userId);
      if (!user) throw { status: 400, message: "Specified user does not exist" };
    }

    await event.update(data);
    return event;
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
};

const deleteEvent = async (id) => {
  try {
    const event = await events.findByPk(id);
    if (!event) return null;
    await event.destroy();
    return event;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
