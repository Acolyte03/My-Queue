// Start of JS file
// Index file for connecting model relationships.
const User = require('./User');
const TVShow = require('./TVShow');

User.hasMany(TVShow, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

TVShow.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { User, TVShow }; 
// End of JS file