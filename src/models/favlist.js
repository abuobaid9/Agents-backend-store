'use strict';

const favlistModel = (sequelize, DataTypes) =>
  sequelize.define(
    'fav',
    {
        product_id: {
            type: DataTypes.INTEGER,
            
        },
        user_id: {
            type: DataTypes.INTEGER,
      
        }
    },
    { timestamps: false }

  );

module.exports = favlistModel;
