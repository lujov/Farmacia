const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('partials/home');
});

router.get('/laboratorio', (req, res) => {
    res.render('partials/laboratorio');
});

module.exports = router;