const User = require('./User');
const TVShow = require('./TVShow');
const Genre = require('./Genre');
const Review = require('./Review');
const Watchlist = require('./Watchlist');

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Genre.hasMany(TVShow, {
    foreignKey: 'tv_show_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(TVShow, {
    foreignKey: 'tv_show_id',
    onDelete: 'CASCADE'
});

// Watchlist constructed here with both 'belongsToMany'
TVShow.belongsToMany(User, {
    through:
    {
        model: Watchlist,
        unique: false,
        foreignKey: 'tv_show_id'
    },
});

User.belongsToMany(TVShow, {
    through:
    {
        model: Watchlist,
        unique: false,
        foreignKey: 'user_id'
    },
});

module.exports = { User, TVShow, Genre, Review, Watchlist }; 