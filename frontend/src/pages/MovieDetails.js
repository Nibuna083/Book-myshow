import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const selectedCity = localStorage.getItem('selectedCity');

  useEffect(() => {
    fetchMovieDetails();
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (selectedDate) {
      fetchShows();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/movies/${id}`);
      setMovie(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setLoading(false);
    }
  };

  const fetchShows = async () => {
    try {
      const response = await axios.get('/shows', {
        params: {
          movieId: id,
          cityId: selectedCity,
          date: selectedDate
        }
      });
      setShows(response.data.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const groupShowsByTheatre = () => {
    const grouped = {};
    shows.forEach(show => {
      const theatreId = show.theatre._id;
      if (!grouped[theatreId]) {
        grouped[theatreId] = {
          theatre: show.theatre,
          shows: []
        };
      }
      grouped[theatreId].shows.push(show);
    });
    return Object.values(grouped);
  };

  const handleShowSelect = (showId) => {
    navigate(`/shows/${showId}/seats`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const theatreGroups = groupShowsByTheatre();

  return (
    <div className="movie-details-page">
      <div className="movie-banner">
        <div className="container">
          <div className="banner-content">
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
            <div className="movie-details">
              <h1>{movie.title}</h1>
              <div className="movie-rating">
                <span>{movie.rating}/10</span>
              </div>
              <div className="movie-meta">
                <span>{movie.duration} min</span>
                <span>{movie.genre.join(', ')}</span>
                <span>{movie.language.join(', ')}</span>
              </div>
              <p className="movie-description">{movie.description}</p>
              {movie.cast && movie.cast.length > 0 && (
                <p className="movie-cast"><strong>Cast:</strong> {movie.cast.join(', ')}</p>
              )}
              {movie.director && (
                <p className="movie-director"><strong>Director:</strong> {movie.director}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="shows-section">
          <h2>Select Show</h2>
          
          <div className="date-selector">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {theatreGroups.length === 0 ? (
            <p className="no-shows">No shows available for this date</p>
          ) : (
            <div className="theatres-list">
              {theatreGroups.map((group) => (
                <div key={group.theatre._id} className="theatre-shows">
                  <h3>{group.theatre.name}</h3>
                  <p className="theatre-address">{group.theatre.address}</p>
                  
                  <div className="show-times">
                    {group.shows.map((show) => (
                      <button
                        key={show._id}
                        className="show-time-btn"
                        onClick={() => handleShowSelect(show._id)}
                      >
                        {show.showTime}
                        <span className="show-format">{show.format}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
