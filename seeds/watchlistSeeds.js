const { Watchlist } = require('../models');

const watchlistData = [
    {
        id: 832924,
        name: "My Cool List",
        user_id: 354626,
        tv_show_id: 3423425
    },
];

const seedWatchlists = () => Watchlist.bulkCreate(watchlistData);

module.exports = seedWatchlists;