const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Watchlist extends Model {}

Watchlist.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    tvshow_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tvshow',
          key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'watchlist',
}
);

module.exports = Watchlist;