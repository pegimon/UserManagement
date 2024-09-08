const {Router} = require('express');
const userRoute = require('./apis/UserRoutes');

const router = Router();

router.use('/users', userRoute);

module.exports = router;