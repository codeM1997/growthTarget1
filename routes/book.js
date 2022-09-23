const express = require('express');

const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/test');


bookRouter.use(auth).route('/')
    .get(bookController.getAll).post(bookController.createBook)

bookRouter.route('/:id')
    .get(bookController.getById)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook)


module.exports = bookRouter