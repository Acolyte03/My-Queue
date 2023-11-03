const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TVShow extends Model {}

TVShow.init(
    {
        id: {

        },
        name: {

        },
        description: {

        },
        tagline: {

        },
        number_of_seasons: {

        },
        number_of_episodes: {

        },
        vote_count: {

        },
        vote_average: {

        },
        popularity: {

        },
        genres: {
            type: DataTypes.STRING,
            references: {
                model: 'genre',
                key: 'id',
            }
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