const { Review } = require('../models');

const reviewData = [
    {
        id: 1,
        comment: "This show is bad and you should feel bad.",
        user_id: 1,
        tv_show_id: 1
    },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
// Example placeholder