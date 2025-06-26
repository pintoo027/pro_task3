const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// ✅ Enable CORS to allow frontend to talk to backend
app.use(cors());

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ In-memory book data
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// ✅ Home route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API! Visit /books to get started.');
});

// ✅ GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// ✅ POST add a new book
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;

  if (!id || !title || !author) {
    return res.status(400).json({ error: 'Please provide id, title, and author' });
  }

  if (books.find(b => b.id === id)) {
    return res.status(409).json({ error: 'Book with this ID already exists' });
  }

  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// ✅ PUT update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json({ message: 'Book updated successfully', book });
});

// ✅ DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
