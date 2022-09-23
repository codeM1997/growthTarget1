const express = require('express');
const router = express.Router();
const bookRouter = require('./book');
const userRouter = require('./user');

router.get('/', (req, res) => {
    res.send('Hello World');
})
router.post('/', (req, res) => {
    res.json({ data: 'Hello World' });
})
router.use('/book',bookRouter);
router.use('/user',userRouter);

router.all('/*', (req, res) => {
    res.send('Page not found');
})


module.exports = router