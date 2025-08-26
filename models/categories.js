'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      // define association here
      categories.hasMany(models.events, {
        foreignKey: 'categoryId',
        as: 'events'
      });
    }
  }
  
  categories.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'categories',
  });
  
  return categories;
};
