import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./TvShowDetails.css";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);

  // Function to add show to watchlist with SweetAlert
  const addToWatchlist = (showId, isPremium = false) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add shows to your watchlist.",
      });
      return;
    }

    // Check if the show is already in the watchlist
    axios
      .get("http://localhost:8000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const watchlist = response.data;
        const alreadyAdded = watchlist.some(
          (item) => item.show_id === showId || item.premium_show_id === showId
        );

        if (alreadyAdded) {
          Swal.fire({
            icon: "info",
            title: "Already in Watchlist",
            text: `${show.title} is already in your watchlist.`,
          });
          return;
        }

        // If not already added, proceed to add to watchlist
        const data = isPremium ? { premium_show_id: showId } : { show_id: showId };

        axios
          .post("http://localhost:8000/api/watchlist", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Added to Watchlist!",
              text: `${show.title} has been added to your watchlist.`,
            });
          })
          .catch((error) => {
            console.error("Error adding to watchlist:", error);
            Swal.fire({
              icon: "error",
              title: "Failed to add",
              text: "There was an issue adding the show to your watchlist. Please try again.",
            });
          });
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load watchlist",
          text: "There was an issue loading your watchlist. Please try again.",
        });
      });
  };

  // Open trailer popup
  const openTrailerPopup = () => {
    if (show.video_url) {
      setShowTrailerPopup(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "No Trailer Available",
        text: "Sorry, no trailer is available for this show.",
      });
    }
  };

  // Close trailer popup
  const closeTrailerPopup = () => {
    setShowTrailerPopup(false);
  };

  useEffect(() => {
    // Fetching regular show details first
    axios
      .get(`http://localhost:8000/api/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch(() => {
        // If fetching regular show details fails, try fetching premium show details
        axios
          .get(`http://localhost:8000/api/premium-shows/${id}`)
          .then((response) => {
            setShow(response.data);
            setLoading(false);
            // Flag this show as premium if it's found in the premium-shows endpoint
            setShow((prevShow) => ({ ...prevShow, isPremium: true }));
          })
          .catch((error) => {
            console.error("Error fetching show details:", error);
            setError(error.response?.data?.error || "Failed to load show details.");
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) {
    return (
      <div className="show-details-loading">
        <div className="spinner"></div>
        <p>Loading show details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="show-details-error">Error: {error}</div>;
  }

  if (!show) {
    return <div className="show-details-error">No show found.</div>;
  }

  return (
    <div className="show-details-container">
      <Navbar />
      <div
        className="show-details-header"
        style={{
          backgroundImage: `url(${show.background_image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="show-details-content">
          <div className="show-poster-container">
            <img
              className="show-poster"
              src={show.image_url || "https://via.placeholder.com/350x525?text=No+Image"}
              alt={show.title || "No Title"}
            />
          </div>

          <div className="show-info-container">
            <div className="show-info">
              <h1 className="show-title">{show.title || "Untitled"}</h1>

              <div className="show-details-meta">
                <>
                  <span>{show.release_date || "TBA"}</span>
                  <span> • </span>
                  <span>
                    {show.genres && show.genres.length > 0
                      ? show.genres.map((genre, index) => (
                          <span key={genre.id}>
                            {genre.name}
                            {index < show.genres.length - 1 && ", "}
                          </span>
                        ))
                      : ""}
                  </span>
                </>
              </div>

              <p className="show-description">{show.description || "No description available."}</p>

              <div className="show-action-buttons">
                <button className="btn-play" onClick={openTrailerPopup}>
                  <i className="play-icon">▶</i> Play
                </button>
                <button
                  className="btn-watchlist"
                  onClick={() => addToWatchlist(show.id, show.isPremium)}
                >
                  + Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Popup */}
      {showTrailerPopup && show.video_url && (
        <div className="trailer-popup">
          <div className="trailer-popup-content">
            <button className="trailer-close-btn" onClick={closeTrailerPopup}>
              &times;
            </button>
            <iframe
              src={show.video_url.replace("watch?v=", "embed/")}
              title="Trailer"
              className="trailer-popup-iframe"
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

export default ShowDetails;
