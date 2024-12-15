import "./MainSection.css";
import './SearchBar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const MainSection = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [premiumMovies, setPremiumMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingShows, setLoadingShows] = useState(true);
  const [loadingPremium, setLoadingPremium] = useState(false);
  const [errorMovies, setErrorMovies] = useState(null);
  const [errorShows, setErrorShows] = useState(null);
  const [errorPremium, setErrorPremium] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('movies');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use navigate for programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          params: { search: searchTerm }
        });
        setMovies(response.data);
        setLoadingMovies(false);
      } catch (error) {
        setErrorMovies(error.response?.data?.error || 'Failed to fetch movies');
        setLoadingMovies(false);
      }
    };

    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/shows', {
          params: { search: searchTerm }
        });
        setShows(response.data);
        setLoadingShows(false);
      } catch (error) {
        setErrorShows(error.response?.data?.error || 'Failed to fetch TV shows');
        setLoadingShows(false);
      }
    };

    const fetchPremiumMovies = async () => {
      try {
        setLoadingPremium(true);
        const response = await axios.get('http://localhost:8000/api/premium-movies', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { search: searchTerm }
        });
        setPremiumMovies(response.data);
        setLoadingPremium(false);
      } catch (error) {
        setErrorPremium(error.response?.data?.error || 'Failed to fetch premium movies');
        setLoadingPremium(false);
      }
    };

    fetchMovies();
    fetchShows();
    fetchPremiumMovies();
  }, [searchTerm]);

  const renderCover = (item, isMovie = true) => {
    const imageUrl = item.image_url || 'https://via.placeholder.com/500x750?text=No+Image';

    return (
      <div key={item.id} className="cover-item">
        <Link to={`/${isMovie ? 'movie' : 'show'}/${item.id}`}>
          <img 
            src={imageUrl} 
            alt={item.title || "No Title"} 
            className="cover-image"
          />
          <div className="cover-overlay">
            <div className="cover-title">{item.title || 'Untitled'}</div>
            <h3 className="cover-subtitle">{item.release_date || 'Release Date Unknown'}</h3>
          </div>
        </Link>
      </div>
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // New function to handle navigation to movie details
  const handlePopularMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <main className="main-content">
      {/* Search Bar */}
      <section className="search-bar-section">
        <div className="search-bar-wrapper">
          <input 
            type="text"
            placeholder="Search movies or shows..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </section>

      {/* Category Buttons */}
      <section className="categories">
        <div className="category-buttons">
          <button 
            className={`category-button ${selectedCategory === 'movies' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('movies')}
          >
            Movies
          </button>
          <button 
            className={`category-button ${selectedCategory === 'shows' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('shows')}
          >
            TV Shows
          </button>
          <button 
            className={`category-button ${selectedCategory === 'premium' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('premium')}
          >
            Premium Movies
          </button>
        </div>

        <div className="content-wrapper">
          {selectedCategory === 'movies' && (
            <div className="content-section">
              <h3>Movies</h3>
              <div className="cover-container">
                {loadingMovies ? (
                  <p>Loading movies...</p>
                ) : errorMovies ? (
                  <p>{errorMovies}</p>
                ) : movies.length > 0 ? (
                  movies.map((movie) => renderCover(movie))
                ) : (
                  <p>No movies available.</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === 'shows' && (
            <div className="content-section">
              <h3>TV Shows</h3>
              <div className="cover-container">
                {loadingShows ? (
                  <p>Loading TV shows...</p>
                ) : errorShows ? (
                  <p>{errorShows}</p>
                ) : shows.length > 0 ? (
                  shows.map((show) => renderCover(show, false))
                ) : (
                  <p>No TV shows available.</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === 'premium' && (
            <div className="content-section">
              <h3>Premium Movies</h3>
              <div className="cover-container">
                {loadingPremium ? (
                  <p>Loading premium movies...</p>
                ) : errorPremium ? (
                  <p>{errorPremium}</p>
                ) : premiumMovies.length > 0 ? (
                  premiumMovies.map((movie) => renderCover(movie))
                ) : (
                  <p>No premium movies available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Movies Slider */}
      <section className="popular-slider">
        <div className="slider-controls">
          <h3>Popular Movies</h3>
          <button 
            className="scroll-btn scroll-left" 
            onClick={() => {
              const slider = document.querySelector('.slider-items');
              slider.scrollLeft -= 300;
            }}
          >
            ← 
          </button>
          <button 
            className="scroll-btn scroll-right"
            onClick={() => {
              const slider = document.querySelector('.slider-items');
              slider.scrollLeft += 300;
            }}
          >
            → 
          </button>
        </div>
        <div className="slider">
          <div className="slider-items">
            {movies.filter(movie => movie.is_popular).map((movie) => (
              <div 
                key={movie.id} 
                className="slider-item"
                onClick={() => handlePopularMovieClick(movie.id)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={movie.image_url || 'https://via.placeholder.com/250x350?text=No+Image'} 
                  alt={movie.title} 
                  className="slider-image" 
                />
                <h4>{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainSection;