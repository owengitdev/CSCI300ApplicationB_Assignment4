if (book) {
    res.json(book);
} else {
    res.status(404).json({ message: 'book not found'});
}


const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());




test('GET /api/books should return all books', async () => {

    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3); // Assuming you have 3 books in your initial data

});


test('GET /api/books/:id should return a specific book', async () => {

    const response = await request(app).get('/api/books/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
});


test ('POST /api/books should add a new book', async () => {

    const newBook = {
        title: "New Book",
        author: "John Doe"
    };

    const response = await request(app).post('/api/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Book");
    expect(response.body.author).toBe("John Doe");

});


test('POST /api/books should return 400 if required fields are missing', async () => {

    const incompleteBook = {
        title: "Incomplete Book"
    };

    const response = await request(app).post('/api/books').send(incompleteBook);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Missing required book fields');

});



test('GET /api/books/:id should return 404 if book not found', async () => {

    const response = await request(app).get('/api/books/999'); // Assuming 999 is an ID that doesn't exist
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('book not found');
});