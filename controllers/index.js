// Start of JS file
// Index for routes.
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// Routes are based on Views + User logged in or not

module.exports = router;
// End of JS file