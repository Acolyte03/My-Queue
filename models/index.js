const User = require('./User');
const TVShow = require('./TVShow');
const Genre = require('./Genre');
const Review = require('./Review');

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