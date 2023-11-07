const router = require('express').Router();
const { TVShow, Watchlist } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all TV shows?...
router.get('/', async (req, res) => {
    await TVShow.findAll({})
        .then(tvShowData => res.json(tvShowData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET TV show by id (or watchlist?)
router.get('/:id', async (req, res) => {
    await TVShow.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(tvShowData => res.json(tvShowData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// CREATE TV show... Watchlist?
router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        await Watchlist.create({
                name: req.body.name,
                tv_show_id: req.body.tv_show_id,
                user_id: req.session.user_id,
            })
            .then(tvShowData => res.json(tvShowData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

// UPDATE TV show (in watchlist)
router.put('/:id', withAuth, async (req, res) => {
    await TVShow.update({
        name: req.body.name // may need to adjust
    }, {
        where: {
            id: req.params.id
        }
    }).then(tvShowData => {
        if (!tvShowData) {
            res.status(404).json({ message: 'No tv show found with this id.' });
            return;
        }
        res.json(tvShowData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE TV show by id (in watchlist)
router.delete('/:id', withAuth, async (req, res) => {
    await Watchlist.destroy({
        where: {
            tv_show_id: req.params.tv_show_id
        }
    }).then(tvShowData => {
        if (!tvShowData) {
            res.status(404).json({ message: 'No tv show found with this id.' });
            return;
        }
        res.json(tvShowData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;