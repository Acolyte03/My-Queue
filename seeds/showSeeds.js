// Insert maybe the top 6 - 10 highest rated TV shows to front page?
const { TVShow } = require('../models');

const tvShowData = [
    {
        id: 1,
        name: "Example",
        number_of_seasons: 5,
        number_of_episodes: 35,
        vote_count: 156,
        vote_average: 8.235,
        overview: "",
        homepage: "",
        in_production: "",
        popularity: "",
        tagline: "",
        genres: "",
        created_by: "",
        networks: "",
        origin_country: "CA", 
        spoken_languages:"English", 
        production_companies:"Shaw Media, World 2000 Entertainment, Take 5 Productions",
        production_countries:"Canada, Ireland",
        episode_run_time: 44
    },
];

const seedShows = () => TVShow.bulkCreate(tvShowData);

module.exports = seedShows;
// Example placeholder;
// Not sure if there's a way to directly pull from the dataset?