const { User, Rol } = require('../models');

const getAllUsers = async () => {
  try {
    return await User.findAll({ include: [{ model: Rol, as: 'rol' }] });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const getUser = async (id) => {
  try {
    return await User.findByPk(id, { include: [{ model: Rol, as: 'rol' }] });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

const createUser = async (data) => {
  try {
    const { username, email, password, phone, birthday, document, gender, state, rolld } = data;

    if (!username || !email || !password || !rolld) {
      throw { status: 400, message: "Required fields: username, email, password, rolld" };
    }

    const rol = await Rol.findByPk(rolld);
    if (!rol) throw { status: 400, message: "Specified rol does not exist" };

    return await User.create({
      username,
      email,
      password,
      phone,
      birthday,
      document,
      gender,
      state: state || "active",
      rolld
    });
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;

    if (data.rolld) {
      const rol = await Rol.findByPk(data.rolld);
      if (!rol) throw { status: 400, message: "Specified rol does not exist" };
    }

    await user.update(data);
    return user;
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
