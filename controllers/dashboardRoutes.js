// Start of JS file
// Dashboard page routes. For someone who IS logged in to view.
const router = require('express').Router();
const { Genre, User, Review, TVShow, Watchlist } = require('../models');
const withAuth = require('../utils/auth');

// Need to implement Genres and Watchlist here

// GET all reviews -> dashboard page
router.get('/', withAuth, async (req, res) => {
    await Review.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'comment',
                'created_at'
            ],
            include: [{
                    model: TVShow,
                    attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
              "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
              "genres", "created_by", "networks"],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(reviewData => {
            const reviews = reviewData.map(review => review.get({ plain: true }));
            res.render('dashboard', { reviews, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET reviews by id to EDIT -> edit-review page
router.get('/edit/:id', withAuth, async (req, res) => {
    await Review.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'comment',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: TVShow,
                    attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
                    "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
                    "genres", "created_by", "networks"],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(reviewData => {
            if (!reviewData) {
                res.status(404).json({ message: 'No review found with this id.' });
                return;
            }

            const review = reviewData.get({ plain: true });
            res.render('edit-review', { review, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// GET new review -> new-review page
router.get('/new', async (req, res) => {
    res.render('new-review');
});

module.exports = router;
// End of JS file