const { ObjectId } = require('mongodb');
const Book = require('../models/book');
exports.getAll = async (req, res) => {
    const books = await Book.find();
    res.json(books);
}
exports.createBook = async (req, res) => {
    try{
        const createdBook = await Book.create(req.body);
        res.status(201).json({ message: 'Book has been created', id: createdBook })
    } catch(err){
        res.status(400).json({
            message:'Error creating a book',
            error: err
        })
    }
    
   
}
exports.getById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
}
exports.updateBook = async (req, res) => {
    const _id = ObjectId(req.params.id);
    const updatedBook = await Book.updateOne({_id},{$set: req.body});
    res.status(201).json({ message: 'Book Updated',id: req.params.id });
}
exports.deleteBook = async (req, res) => {
    const _id = ObjectId(req.params.id);
    await Book.deleteOne({_id});
    res.json({ data: `Single Book Deleted`, id: req.params.id });
}