const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: "John Smith",
        email: "something@somewhere.com",
        password: "iw$1dteA"
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
// Example placeholder