import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const selectedCity = localStorage.getItem('selectedCity');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const params = selectedCity ? { cityId: selectedCity } : {};
      const response = await axios.get('/movies', { params });
      setMovies(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch movies');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movies-page">
      <div className="container">
        <h1>Now Showing</h1>
        
        <div className="movies-grid">
          {movies.map((movie) => (
            <Link to={`/movies/${movie._id}`} key={movie._id} className="movie-card">
              <div className="movie-poster">
                <img src={movie.posterUrl} alt={movie.title} />
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="movie-genre">{movie.genre.join(', ')}</p>
                <span className="movie-rating">{movie.rating}/10</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
