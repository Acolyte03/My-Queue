// Start of JS file
// Review page routes. For someone who IS logged in to view.
const router = require('express').Router();
const { Genre, User, Review, TVShow, Watchlist } = require('../models');
const withAuth = require('../utils/auth');

// Need to implement Genres and Watchlist here

// GET all reviews -> reviews page
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
              "genres", "created_by", "networks", "origin_country", "spoken_languages","production_companies",
              "production_countries", "episode_run_time"],
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
            res.render('reviews', { reviews, loggedIn: true });
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
              "genres", "created_by", "networks", "origin_country", "spoken_languages","production_companies",
              "production_countries", "episode_run_time"],
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