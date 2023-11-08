const { Watchlist } = require('../models');

const watchlistData = [
    {
        id: 1,
        name: "My Cool List",
        user_id: 1,
        tv_show_id: 1
    },
    {
        id: 2,
        name: "The Real List",
        user_id: 2,
        tv_show_id: 2
    },
    {
        id: 3,
        name: "Best List",
        user_id: 3,
        tv_show_id: 3
    }
];

const seedWatchlists = () => Watchlist.bulkCreate(watchlistData);

module.exports = seedWatchlists;
// Example placeholder