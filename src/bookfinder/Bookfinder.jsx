import  { useState } from 'react';
import axios from 'axios';

const Bookfinder = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Book Finder</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Search for a book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button style={styles.button} onClick={handleSearch} disabled={!query}>
        Search
      </button>

      {loading && <p style={styles.loading}>Loading...</p>}

      <div style={styles.results}>
        {books.map((book, index) => (
          <div key={index} style={styles.bookCard}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                style={styles.bookImage}
              />
            ) : (
              <div style={styles.placeholderImage}>No Image</div>
            )}
            <div style={styles.bookDetails}>
              <h2 style={styles.bookTitle}>{book.title}</h2>
              <p style={styles.bookAuthor}>Author: {book.author_name?.[0]}</p>
              <p style={styles.bookYear}>Published: {book.first_publish_year}</p>
              <p style={styles.bookPublisher}>Publisher: {book.publisher?.[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    color: '#333',
  },
  title: {
    fontSize: '2em',
    color: '#333',
  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  loading: {
    fontSize: '1.2em',
    marginTop: '20px',
    color: '#007BFF',
  },
  results: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  bookCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '15px',
    borderRadius: '8px',
    width: '200px',
    padding: '15px',
  },
  bookImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  placeholderImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '200px',
    backgroundColor: '#e0e0e0',
    color: '#888',
    fontSize: '0.9em',
    borderRadius: '5px',
  },
  bookDetails: {
    textAlign: 'left',
    marginTop: '10px',
  },
  bookTitle: {
    fontSize: '1.1em',
    color: '#333',
  },
  bookAuthor: {
    fontSize: '0.9em',
    color: '#555',
  },
  bookYear: {
    fontSize: '0.9em',
    color: '#555',
  },
  bookPublisher: {
    fontSize: '0.9em',
    color: '#555',
  },
};

export default Bookfinder;
