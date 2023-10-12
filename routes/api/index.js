const router = require('express').Router();
const noteRoutes = require('./noteRoutes');

router.use('/api', noteRoutes);

module.exports = router;