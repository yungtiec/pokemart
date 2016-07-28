'use strict'

var Sequelize = require('sequelize');

var db = require('../_db');

var OrderDetails = db.model('userDetails');

// OB/SB: consider more validations
module.exports = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: { // OB/SB: just one?
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    photoUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    price: {
        type: Sequelize.INTEGER,
        defaultValue: 10000
    }
},{
    instanceMethods:{
        addToOrder: function (quantity, userOrderId){
          OrderDetails.create({
            price: this.price,
            title: this.title,
            quantity: quantity,
            productId: this.id
        }).then(function(newOrder){
            newOrder.setUserOrder(userOrderId)
        })
    }
}
});

