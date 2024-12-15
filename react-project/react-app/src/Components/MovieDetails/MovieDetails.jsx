import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./MovieDetails.css";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../NavBar/NavBar.jsx";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);
  const [showPlayPopup, setShowPlayPopup] = useState(false);
  const subscriptionType = localStorage.getItem('subscriptionType'); // "Basic" or "Premium"

  // Check if the user has a valid subscription (Basic or Premium)
  const checkSubscription = () => {
    return subscriptionType === 'Basic' || subscriptionType === 'Premium';
  };
  const addToWatchlist = (movieId, isPremium = false) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add movies to your watchlist.",
      });
      return;
    }
  
    const data = isPremium ? { premium_movie_id: movieId } : { movie_id: movieId };
  
    axios
      .post("http://localhost:8000/api/watchlist", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.message.includes("already")) {
          Swal.fire({
            icon: "info",
            title: "Already in Watchlist",
            text: "This movie is already in your watchlist.",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Added to Watchlist!",
            text: "Movie has been successfully added to your watchlist.",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: error.response?.data?.error || "Something went wrong. Please try again.",
        });
      });
  };

  const openTrailerPopup = () => {
    if (movie.video_url) {
      setShowTrailerPopup(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "No Trailer Available",
        text: "Sorry, no trailer is available for this movie.",
      });
    }
  };

  const closeTrailerPopup = () => {
    setShowTrailerPopup(false);
  };

  const openPlayPopup = () => {
    if (movie.movie_url) {
      setShowPlayPopup(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "No Movie Available",
        text: "Sorry, no movie URL is available for this movie.",
      });
    }
  };

  const closePlayPopup = () => {
    setShowPlayPopup(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        axios
          .get(`http://localhost:8000/api/premium-movies/${id}`)
          .then((response) => {
            setMovie(response.data);
            setLoading(false);
            setMovie((prevMovie) => ({ ...prevMovie, isPremium: true }));
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error);
            setError(error.response?.data?.error || "Failed to load movie details.");
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="movie-details-error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="movie-details-error">No movie found.</div>;
  }

  return (
    <div className="movie-details-container">
      <Navbar />
      <div
        className="movie-details-header"
        style={{
          backgroundImage: `url(${movie.background_image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="movie-details-content">
          <div className="movie-poster-container">
            <img
              className="movie-poster"
              src={movie.image_url || "https://via.placeholder.com/350x525?text=No+Image"}
              alt={movie.title || "No Title"}
            />
          </div>

          <div className="movie-info-container">
            <div className="movie-info">
              <h1 className="movie-title">{movie.title || "Untitled"}</h1>
              <span>{movie.release_date || "TBA"}</span>
              <span> • </span>
              <span>
                {movie.genres?.map((genre, index) => (
                  <span key={genre.id}>
                    {genre.name}
                    {index < movie.genres.length - 1 && ", "}
                  </span>
                )) || ""}
              </span>
              <p className="movie-description">{movie.description || "No description available."}</p>
              <div className="movie-action-buttons">
                <button className="btn-play" onClick={openTrailerPopup}>
                  <i className="play-icon">▶</i> Watch Trailer
                </button>
                {checkSubscription() && (
                  <button className="btn-play" onClick={openPlayPopup}>
                    <i className="play-icon">▶</i> Play Movie
                  </button>
                )}
                <button className="btn-watchlist" onClick={() => addToWatchlist(movie.id, movie.isPremium)}>
                  + Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTrailerPopup && movie.video_url && (
        <div className="trailer-popup">
          <div className="trailer-popup-content">
            <button className="trailer-close-btn" onClick={closeTrailerPopup}>
              &times;
            </button>
            <iframe
              src={movie.video_url.replace("watch?v=", "embed/")}
              title="Trailer"
              className="trailer-popup-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {showPlayPopup && movie.movie_url && (
        <div className="play-popup">
          <div className="play-popup-content">
            <button className="play-close-btn" onClick={closePlayPopup}>
              &times;
            </button>
            <iframe
              src={movie.movie_url}
              title="Play Movie"
              className="play-popup-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MovieDetails;
