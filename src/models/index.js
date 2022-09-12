'use strict';
require('dotenv').config();
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./user');
const productModel = require('./product');
const commentModel = require('./comment');
const favlistModel = require('./favlist');
const cartModel = require('./cart');


const DataCollection = require('./lib/collection.model');

let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
                native: true
            },
        }
        : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = users(sequelize, DataTypes);


const productTable = productModel(sequelize, DataTypes);
const productCollection = new DataCollection(productTable);

const cartTabel = cartModel(sequelize, DataTypes);
const cartCollection = new DataCollection(cartTabel);

const commentTable = commentModel(sequelize, DataTypes);
const commentCollection = new DataCollection(commentTable);

const favlistTable = favlistModel(sequelize, DataTypes);
const favlistCollection = new DataCollection(favlistTable);

// User has many products:
userTable.hasMany(productTable, {
    foreignKey: "user_id",
    sourceKey: "id"
}); 
productTable.belongsTo(userTable, {
    foreignKey: "user_id",
    targetKey: "id",
});

//User has one favlist
userTable.hasOne(favlistTable, {
    foreignKey: 'user_id',
    targetKey: 'id'
}); 
favlistTable.belongsTo(userTable, {
    foreignKey: 'user_id',
    targetKey: 'id'
}); 


// User has one Cart
userTable.hasOne(cartTabel, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
cartTabel.belongsTo(userTable, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
// Cart has many Products
cartTabel.hasMany(productTable, {
    foreignKey: "cart_id",
    sourceKey: "id"
});

productTable.belongsTo(cartTabel, {
    foreignKey: "cart_id",
    targetKey: "id",
});

// Wishlist has many Products
favlistTable.hasMany(productTable, {
    foreignKey: "favlist_id",
    sourceKey: "id"
});

productTable.belongsTo(favlistTable, {
    foreignKey: "favlist_id",
    targetKey: "id",
});

//User has many comments
userTable.hasMany(commentTable, {
    foreignKey: "user_id",
    sourceKey: "id"
}); 
commentTable.belongsTo(userTable, {
    foreignKey: "user_id",
    targetKey: "id",
}); 


// Product has many comments
productTable.hasMany(commentTable, {
    foreignKey: "order_id",
    sourceKey: "id"
}); 
commentTable.belongsTo(productTable, {
    foreignKey: "order_id",
    targetKey: "id",
});

module.exports = {
    db: sequelize,
    users: userTable,
    productTable:productTable,
    productCollection: productCollection,
    cartTabel:cartTabel,
    cartCollection:cartCollection,
    commentTable:commentTable,
    commentCollection:commentCollection,
    favlistCollection:favlistCollection,
    favlistTable:favlistTable
};