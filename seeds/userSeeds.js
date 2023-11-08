const { User } = require('../models');

const userData = [
    {
        id: 1,
        email: "Jdawg42069@something.com",
        password: "iw$1dteA"
    },
    { 
        id: 2,
        email: "sweetpete34@tty.com",
        password: "hsd%sfd3S"
    },
    {
        id: 3,
        email: "Zsuzz@zz.org",
        password: "ie#12Sdoi!"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
// Example placeholder