const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: "Jdawg42069",
        password: "iw$1dteA"
    },
    {
        id: 2,
        username: "sweetpete34",
        password: "hsd%sfd3S"
    },
    {
        id: 3,
        username: "Zsuzz",
        password: "ie#12Sdoi!"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
// Example placeholder