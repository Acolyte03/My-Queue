const { Genre } = require('../models');

const genreData = [
    {
        id: 1,
        genre_name: "Fantasy",
        description: "Medieval stuff and magic sometimes",
        tv_show_id: 1
    },
    {
        id: 2,
        genre_name: "Drama",
        description: "Very dramatic, wow",
        tv_show_id: 2
    },
    {
        id: 3,
        genre_name: "Sci-Fi",
        description: "Space, time, spacetime?",
        tv_show_id: 3
    },
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
// Example placeholder