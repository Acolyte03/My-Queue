// Start of JS file
// Home page routes. For someone NOT logged in to view.
const router = require('express').Router();
const { Genre, User, Review, TVShow } = require('../models');
const withAuth = require('../utils/auth');

// Need to implement Genres here

// GET all reviews -> main
router.get('/', async (req, res) => {
  console.log(res);
  await Review.findAll({
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
        },
    ]
})
.then(reviewData => {
    console.log('test: ', reviewData);
    const reviews = reviewData.map(review => review.get({ plain: true }));
    res.render('layouts/main', {reviews, loggedIn: req.session.loggedIn});
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// GET reviews by id -> single-review
router.get('/reviews/:id', async (req, res) => {
  await Review.findOne({
    where: {
        id: req.params.id
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
    if (!reviewData) {
        res.status(404).json({ message: 'No review found with this id.' });
        return;
    }
    const review = reviewData.get({ plain: true });
    console.log(review);
    res.render('single-review', { review, loggedIn: req.session.loggedIn });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// GET reviews for tv shows -> reviews-shows
router.get('/reviews-shows', async (req, res) => {
  await Review.findOne({
        where: {
            id: req.params.id
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
        if (!reviewData) {
            res.status(404).json({ message: 'No review found with this id.' });
            return;
        }
        const review = reviewData.get({ plain: true });
        res.render('reviews-shows', { review, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Not sure if we need this yet, maybe for a look to a watchlist?
// Would have to go in /dashboardRoutes
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Watchlist }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login route -> login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// GET signup -> signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// router.get('/main', (req, res) => {
//   res.render('main');
// });

module.exports = router;
// End of JS file