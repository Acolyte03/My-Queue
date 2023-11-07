const { Watchlist } = require('../models');

const watchlistData = [
    {
        id: 1,
        name: "My Cool List",
        user_id: 1,
        tv_show_id: 3
    },
];

const seedWatchlists = () => Watchlist.bulkCreate(watchlistData);

module.exports = seedWatchlists;
// Example placeholder