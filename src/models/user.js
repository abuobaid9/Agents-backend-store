'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const users = (sequelize, DataTypes) => {
    const model = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            required: true,
        },
      
        token: {
            type: DataTypes.VIRTUAL,
          }
    });
    model.authenticateBasic = async function (username, password) {
        const user = await this.findOne({
            where: {
                username: username
            }
        });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            let newToken = jwt.sign({ username: user.username }, process.env.SECRET);
            // console.log('********', newToken);
            user.token = newToken;
            return user;
        } else {
            throw new Error('Invalid User');
        }
    };
    model.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const user = await this.findOne({
                where: {
                    username: parsedToken.username
                }
            });
            if (user) {
                return user;
            }
            throw new Error("User Not Found");
        } catch (e) {
            throw new Error(e.message)
        }
    };
    return model;
}

module.exports = users;