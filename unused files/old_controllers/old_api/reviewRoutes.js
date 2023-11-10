// Start of JS file
// ReviewRoutes for GET, POST, PUT, DELETE of reviews.
const router = require('express').Router();
const { Review, TVShow, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all reviews (for a TVShow)
router.get('/', async (req, res) => {
    await Review.findAll({
        attributes: ['id', 'title', 'comment', 'created_at'],
        include: [
            {
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
        .then(reviewData => res.json(reviewData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET review by id
router.get('/:id', async (req, res) => {
    await Review.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'comment', 'created_at'],
            include: [
                {
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
        res.json(reviewData);
    }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// CREATE review
router.post('/', withAuth, async (req, res) => {
        await Review.create({
                title: req.body.title,
                comment: req.body.comment,
                user_id: req.session.user_id,
                tv_show_id: req.body.tv_show_id
            })
            .then(reviewData => res.json(reviewData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
});

// UPDATE review
router.put('/:id', withAuth, async (req, res) => {
    await Review.update({
        title: req.body.title,
        comment: req.body.comment
    }, {
        where: {
            id: req.params.id
        }
    }).then(reviewData => {
        if (!reviewData) {
            res.status(404).json({ message: 'No review found with this id.' });
            return;
        }
        res.json(reviewData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE review by id
router.delete('/:id', withAuth, async (req, res) => {
    await Review.destroy({
        where: {
            id: req.params.id
        }
    }).then(reviewData => {
        if (!reviewData) {
            res.status(404).json({ message: 'No review found with this id.' });
            return;
        }
        res.json(reviewData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
// End of JS file