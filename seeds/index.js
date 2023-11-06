const seedGenres = require('./genreSeeds');
const seedReviews = require('./reviewSeeds');
const seedShows = require('./showSeeds');
const seedUsers = require('./userSeeds');
const seedWatchlists = require('./watchlistSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedGenres();
  console.log('\n----- GENRES SEEDED -----\n');

  await seedReviews();
  console.log('\n----- REVIEWS SEEDED -----\n');

  await seedShows();
  console.log('\n----- TV SHOWS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedWatchlists();
  console.log('\n----- WATCHLISTS SEEDED -----\n');

  process.exit(0);
};

seedAll();