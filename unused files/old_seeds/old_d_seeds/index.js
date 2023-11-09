const sequelize = require('../config/connection');
const { User, TVShow } = require('../models');

const userData = require('./userData.json');
const tvshowData = require('./tvshowData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const tvshow of tvshowData) {
    await TVShow.create({
      ...tvshow,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
// End of JS file
