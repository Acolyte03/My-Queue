// Start of JS file
// TVShowRoutes for TV shows.
const router = require('express').Router();
const { TVShow } = require('../../models');
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

// CREATE TV show?
router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        await TVShow.create({
            id: req.body.id,
            name: req.body.name,
            number_of_seasons: req.body.number_of_seasons,
            number_of_episodes: req.body.number_of_episodes,
            vote_count: req.body.vote_count,
            vote_average: req.body.vote_average,
            overview: req.body.overview,
            homepage: req.body.homepage,
            in_production: req.body.in_production,
            popularity: req.body.popularity,
            tagline: req.body.tagline,
            genres: req.body.genres,
            created_by: req.body.created_by,
            networks: req.body.networks,
            origin_country: req.body.origin_country,
            spoken_languages: req.body.spoken_languages,
            production_companies: req.body.production_companies,
            production_countries: req.body.production_countries,
            episode_run_time: req.body.episode_run_time,
            })
            .then(tvShowData => res.json(tvShowData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

// UPDATE TV show
router.put('/:id', withAuth, async (req, res) => {
    await TVShow.update({
        name: req.body.name,
        number_of_seasons: req.body.number_of_seasons,
        number_of_episodes: req.body.number_of_episodes,
        vote_count: req.body.vote_count,
        vote_average: req.body.vote_average,
        overview: req.body.overview,
        homepage: req.body.homepage,
        in_production: req.body.in_production,
        popularity: req.body.popularity,
        tagline: req.body.tagline,
        genres: req.body.genres,
        created_by: req.body.created_by,
        networks: req.body.networks,
        origin_country: req.body.origin_country,
        spoken_languages: req.body.spoken_languages,
        production_companies: req.body.production_companies,
        production_countries: req.body.production_countries,
        episode_run_time: req.body.episode_run_time,
    }, {
        where: {
            id: req.params.id
        }
    }).then(tvShowData => {
        if (!tvShowData) {
            res.status(404).json({ message: 'No TV show found with this id.' });
            return;
        }
        res.json(tvShowData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE TV show by id
router.delete('/:id', withAuth, async (req, res) => {
    await TVShow.destroy({
        where: {
            id: req.params.id
        }
    }).then(tvShowData => {
        if (!tvShowData) {
            res.status(404).json({ message: 'No TV show found with this id.' });
            return;
        }
        res.json(tvShowData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
// End of JS file