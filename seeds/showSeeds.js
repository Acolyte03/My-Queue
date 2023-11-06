// Insert maybe the top 6 - 10 highest rated TV shows to front page?
const { TVShow } = require('../models');

const tvShowData = [
    {
        id: 14141,
        name: "Example",
        number_of_seasons: 5,
        number_of_episodes: 265,
        vote_count: 15616,
        vote_average: 8.235,
        overview: "",
        homepage: "",
        in_production: "",
        popularity: "",
        tagline: "",
        genres: "",
        created_by: "",
        networks: "",
    },
];

const seedShows = () => TVShow.bulkCreate(tvShowData);

module.exports = seedShows;
// Example placeholder;
// Not sure if there's a way to directly pull from the dataset?