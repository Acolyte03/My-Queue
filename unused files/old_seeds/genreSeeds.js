const { Genre } = require('../models');

const genreData = [
    {
        genre_name: "Fantasy"
    },
    {
        genre_name: "Drama"
    },
    {
        genre_name: "Sci-Fi"
    },
    {
        genre_name: "Sci-Fi & Fantasy"
    },
    {
        genre_name: "Family"
    },
    {
        genre_name: "Comedy"
    },
    {
        genre_name: "Action & Adventure"
    },
    {
        genre_name: "Animation"
    },
    {
        genre_name: "Crime"
    },
    {
        genre_name: "Mystery"
    },
    {
        genre_name: "War & Politics"
    },
    {
        genre_name: "Kids"
    },
    {
        genre_name: "Soap"
    },
    {
        genre_name: "Documentary"
    },
    {
        genre_name: "Reality"
    }
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
// Example placeholder