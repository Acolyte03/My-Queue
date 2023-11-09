const User = require('./User');
const TVShow = require('./TVShow');
const Genre = require('./Genre');
const Review = require('./Review');
const Watchlist = require('./Watchlist');

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Watchlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Genre.hasMany(TVShow, {
        foreignKey: 'genre_id',
        onDelete: 'CASCADE'
});

TVShow.hasMany(Review, {
    foreignKey: 'tv_show_id',
    onDelete: 'CASCADE'
});

TVShow.belongsTo(Genre, {
    foreignKey: 'tv_show_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(TVShow, {
    foreignKey: 'tv_show_id',
    onDelete: 'CASCADE'
});

Watchlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Watchlist.belongsTo(TVShow, {
    foreignKey: 'tv_show_id',
    onDelete: 'CASCADE'
});

module.exports = { User, TVShow, Genre, Review, Watchlist }; 
