const { Watchlist } = require('../models');

const watchlistData = [
    {
        name: "My Cool List",
        // user_id: 1,
        // tv_show_id: 1
    },
    {
        name: "The Real List",
        // user_id: 2,
        // tv_show_id: 2
    },
    {
        name: "Best List",
        // user_id: 3,
        // tv_show_id: 3
    }
];

const seedWatchlists = () => Watchlist.bulkCreate(watchlistData);

module.exports = seedWatchlists;
// Example placeholder