'use strict';

const productModel = (sequelize, DataTypes) =>
  sequelize.define(
    'product',
    {
      title: { type: DataTypes.STRING, required: true, unique: true, },
      price: { type: DataTypes.FLOAT(6) },
      description: { type: DataTypes.STRING, required: false },
      category:{ type: DataTypes.STRING, required: false },
      image: { type: DataTypes.STRING, required: true },
      rating:{ type: DataTypes.FLOAT(6)},
      user_id: {type: DataTypes.INTEGER, },
      favlist_id: {type: DataTypes.INTEGER,},
    },
    { timestamps: false }
  );

module.exports = productModel;
