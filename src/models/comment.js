'use strict';

const commentModel = (sequelize, DataTypes) =>
  sequelize.define(
    'comment',
    {
      comment: {
        type: DataTypes.STRING,
        required: false
      },
      // foreign key
      product_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      }

    },
    { timestamps: true }

  );

module.exports = commentModel;
