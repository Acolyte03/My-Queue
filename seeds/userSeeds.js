const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: "John Smith",
        username: "Jdawg42069",
        password: "iw$1dteA"
    },
    {
        id: 2,
        name: "Peter Peater",
        username: "sweetpete34",
        password: "hsd%sfd3S"
    },
    {
        id: 3,
        name: "Suzie Z",
        username: "Zsuzz",
        password: "ie#12Sdoi!"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
// Example placeholder