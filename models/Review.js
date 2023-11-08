const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            // references: {
            //   model: 'user',
            //   key: 'id',
            // },
        },
        tv_show_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'tvshow',
              key: 'id',
            },
        },
        created_at: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    }
);
      
module.exports = Review; 