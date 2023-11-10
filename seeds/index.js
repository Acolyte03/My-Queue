// Start of JS file
// Seeding the database.
const seedShows = require('./tvShowSeeds');
const seedUsers = require('./userSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedShows();
  console.log('\n----- TV SHOWS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
// End of JS file