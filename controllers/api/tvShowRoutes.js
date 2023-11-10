// Start of JS file
// TVShowRoutes for TV shows.
const router = require('express').Router();
const { TVShow } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new TV show
router.post('/', withAuth, async (req, res) => {
  try {
    const newTVShow = await TVShow.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTVShow);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE TV show
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tvshowData = await TVShow.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!tvshowData) {
      res.status(404).json({ message: 'No tv show found with this id!' });
      return;
    }

    res.status(200).json(tvshowData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
// End of JS file