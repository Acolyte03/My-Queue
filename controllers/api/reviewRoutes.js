const router = require('express').Router();
const { Review, TVShow } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all reviews (for a TVShow)
router.get('/', async (req, res) => {
    await Review.findAll({
        //attributes: ["id", "comment", "user_id", "tv_show_id"],
        // include: [
        //     { 
        //       model: TVShow,
        //       attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
        //       "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
        //       "genres", "created_by", "networks"]
        //     }
        // ]
    })
        .then(reviewData => res.json(reviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET review by id
router.get('/:id', async (req, res) => {
    await Review.findAll({
            where: {
                id: req.params.id
            },
            // include: [
            //     { 
            //       model: TVShow,
            //       attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
            //       "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
            //       "genres", "created_by", "networks"]
            //     }
            // ]
        })
        .then(reviewData => res.json(reviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// CREATE review
router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        await Review.create({
                comment: req.body.comment,
                user_id: req.session.user_id,
                tv_show_id: req.body.tv_show_id,

            })
            .then(reviewData => res.json(reviewData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

// UPDATE review
router.put('/:id', withAuth, async (req, res) => {
    await Review.update({
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