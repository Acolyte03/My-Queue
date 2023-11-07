const { Genre } = require('../models');

const genreData = [
    {
        id: 1,
        genre_name: "Fantasy",
        description: "Medieval stuff and magic sometimes",
        tv_show_id: 1
    },
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
// Example placeholder