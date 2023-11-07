const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TVShow extends Model {}

TVShow.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        number_of_seasons: {
            type: DataTypes.INTEGER,
        },
        number_of_episodes: {
            type: DataTypes.INTEGER,
        },
        vote_count: {
            type: DataTypes.INTEGER,
        },
        vote_average: {
            type: DataTypes.FLOAT,
        },
        overview: {
            type: DataTypes.TEXT,
        },
        homepage: {
            type: DataTypes.STRING,
        },
        in_production: {
            type: DataTypes.BOOLEAN,
        },
        popularity: {
            type: DataTypes.FLOAT,
        },
        tagline: {
            type: DataTypes.STRING,
        },
        genres: {
            type: DataTypes.STRING,
            references: {
                model: 'genre',
                key: 'id',
            }
        },
        created_by: {
            type: DataTypes.STRING,
        },
        networks: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tvshow',
    }
);

module.exports = TVShow;