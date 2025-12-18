import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './Home.css';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('/cities');
      setCities(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setLoading(false);
    }
  };

  const handleCitySelect = (cityId) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    navigate('/movies');
  };

  const cityIcons = {
    'Mumbai': '🌆',
    'Delhi': '🏛️',
    'Bangalore': '🌳',
    'Hyderabad': '🕌',
    'Chennai': '🏖️',
    'Kolkata': '🎭',
    'Pune': '🎓',
    'Ahmedabad': '🏰'
  };

  const citySubtitles = {
    'Mumbai': 'City of Dreams',
    'Delhi': 'Heart of India',
    'Bangalore': 'Silicon Valley of India',
    'Hyderabad': 'City of Pearls',
    'Chennai': 'Gateway to South India',
    'Kolkata': 'City of Joy',
    'Pune': 'Cultural Capital',
    'Ahmedabad': 'Heritage City'
  };

  if (loading) {
    return <div className="loading">🎬 Loading cities...</div>;
  }

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>🎬 Book Movie Tickets</h1>
        <p className="subtitle">Watch the latest movies in your city</p>
      </div>
      <div className="home-container">
        <h2 className="section-title">Select Your City</h2>
        <div className="cities-grid">
          {cities.map((city) => (
            <div
              key={city._id}
              className="city-card"
              onClick={() => handleCitySelect(city._id)}
            >
              <div className="city-content">
                <div className="city-icon">{cityIcons[city.name] || '🏙️'}</div>
                <h3>{city.name}</h3>
                <p className="city-subtitle">{citySubtitles[city.name] || 'Explore Movies'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
