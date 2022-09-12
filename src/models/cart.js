"use strict";

const cartModel = (sequelize, DataTypes) =>
    sequelize.define("carts", {
        // foreign key
        user_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
    });

// cartModel.removeAttribute('id');

module.exports = cartModel;