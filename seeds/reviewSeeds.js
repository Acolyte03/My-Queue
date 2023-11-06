const { Review } = require('../models');

const reviewData = [
    {
        id: 231,
        user_id: 9591,
        comment: "This show is bad and you should feel bad.",
        tv_show_id: 985905
    },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
// Example placeholder;