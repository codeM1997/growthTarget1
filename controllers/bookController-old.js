const connect = require('../database/db');
const { ObjectId } = require('mongodb');
exports.getAll = async (req, res) => {
    const db = await connect();
    const books = await db.collection('book').find().toArray();
    res.json(books);
}

exports.createBook = async (req, res) => {
    const db = await connect();
    const created = await db.collection('book').insertOne(req.body);
    res.status(201).json({ message: 'Book has been created', id: created.insertedId })
}
exports.getById = async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await connect();
    const book = await db.collection('book').find({ _id: id }).toArray();
    res.json(book);
}
exports.updateBook = async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await connect();
    const updatedBook = await db.collection('book').updateOne({ _id: id }, { $set: req.body })
    res.status(201).json({ message: 'Book Updated', data: updatedBook, id: req.params.id });
}
exports.deleteBook = async (req, res) => {
    const _id = ObjectId(req.params.id);
    const db = await connect();
    await db.collection("book").deleteOne({ _id })
    res.json({ data: `Single Book Deleted`, id: req.params.id });
}