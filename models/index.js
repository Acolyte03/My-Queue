const User = require('./User');
const TVShow = require('./TVShow');
const Genre = require('./Genre');

// Figure out how User is connected to TVShow,
// TVShow is connected to Genre

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, TVShow, Genre };