const { Review } = require('../models');

const reviewData = [
    {
        id: 1,
        title: "Why this show sucks.",
        comment: "This show is bad and you should feel bad.",
        user_id: 1,
        tv_show_id: 1
    },
    {
        id: 2,
        title: "Meh.",
        comment: "It's okay, I guess.",
        user_id: 2,
        tv_show_id: 2
    },
    {
        id: 3,
        title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        comment: "OMG SO GOOD LALAFLKAJGALAG;WE",
        user_id: 3,
        tv_show_id: 3
    },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
// Example placeholder