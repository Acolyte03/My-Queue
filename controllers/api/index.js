const router = require('express').Router();
const tvShowRoutes = require('./tvShowRoutes');
const genreRoutes = require('./genreRoutes');
const userRoutes = require('./userRoutes');

router.use('/tvshow', tvShowRoutes);
router.use('/genre', genreRoutes);
router.use('/user', userRoutes);
// Routes are based on Models 

module.exports = router; 