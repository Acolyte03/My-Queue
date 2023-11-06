const User = require('./User');
const TVShow = require('./TVShow');
const Genre = require('./Genre');
const Review = require('./Review');
<<<<<<< HEAD

// User hasMany Review, TVShow
// TVShow hasMany Genre, Review
// Review belongsTo User, TVShow
// Make sure logic connects.

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// }); 

module.exports = { User, TVShow, Genre, Review }; 
=======
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
>>>>>>> 292e5c3d1fd261e3463bcb76fd1c6b0975dc4bbb
