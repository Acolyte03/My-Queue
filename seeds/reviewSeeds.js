const { Review } = require('../models');

const reviewData = [
    {
        title: "Why this show sucks.",
        comment: "This show is bad and you should feel bad.",
        rating: 1,
        // tv_show_id: 1399
    },
    {
        title: "Meh.",
        comment: "It's okay, I guess.",
        rating: 5,
        // tv_show_id: 1622
    },
    {
        title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        comment: "OMG SO GOOD LALAFLKAJGALAG;WE",
        rating: 10,
        // tv_show_id: 246
    },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
// Example placeholder