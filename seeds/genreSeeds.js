const { Genre } = require('../models');

const genreData = [
    {
        genre_name: "Fantasy",
        tv_show_id: 1
    },
    {
        genre_name: "Drama",
        tv_show_id: 2
    },
    {
        genre_name: "Sci-Fi",
        tv_show_id: 3
    },
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
// Example placeholder