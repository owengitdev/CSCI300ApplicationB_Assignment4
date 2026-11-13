// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

/* Create your REST API here with the following endpoints:
    'GET /api/books': 'Get all books',
    'GET /api/books/:id': 'Get a specific book',
    'POST /api/books': 'Add a new book',
    'PUT /api/books/:id': 'Update a book',
    'DELETE /api/books/:id': 'Delete a book'
*/

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'book not found'});
    }
})


// POST /api/books
app.post('/api/books', (req, res) => {

    const newBook = req.body;
    newBook.id = books.length + 1; // Assign a new ID
    books.push(newBook);
    res.status(201).json(newBook);

    
    if (!newBook.title || !newBook.author || !newBook.genre || newBook.copiesAvailable === undefined) {
        return res.status(400).json({ message: 'Missing required book fields' });
    }
    books.push(newBook);
    res.status(201).json(newBook);
})






