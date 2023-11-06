const { Genre } = require('../models');

const genreData = [
    {
        id: 34235,
        name: "Fantasy",
        description: "Medieval stuff and magic sometimes",
        tvshow_id: 31311
    },
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
// Example placeholder;