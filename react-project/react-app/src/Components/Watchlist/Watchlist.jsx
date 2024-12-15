import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Navbar from "../NavBar/NavBar";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch the watchlist from the API
    axios
      .get("http://localhost:8000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWatchlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  }, [token]);

  const handleRemoveFromWatchlist = (itemId, type) => {
    Swal.fire({
      title: "Remove from Watchlist?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00ff41",
      cancelButtonColor: "#121212",
      confirmButtonText: "Delete",
      background: "#121212",
      color: "#00ff41",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8000/api/watchlist/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            // Update the local state after successful deletion
            setWatchlist(
              watchlist.filter(
                (item) =>
                  !(type === "movie" && item.movie?.id === itemId) &&
                  !(type === "show" && item.show?.id === itemId) &&
                  !(type === "premium_movie" && item.premium_movie?.id === itemId)
              )
            );

            Swal.fire({
              title: "Deleted!",
              text: "Item removed from your watchlist.",
              icon: "success",
              confirmButtonColor: "#00ff41",
              background: "#121212",
              color: "#00ff41",
            });
          }
        } catch (error) {
          console.error("Error removing from watchlist:", error);
          Swal.fire({
            title: "Error!",
            text: "Could not remove the item.",
            icon: "error",
            confirmButtonColor: "#00ff41",
            background: "#121212",
            color: "#00ff41",
          });
        }
      }
    });
  };

  return (
   
    <div
    
      style={{
        backgroundColor: "#121212",
        color: "#00ff41",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "monospace",
      }}
      
    >
    
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "40px",
        }}
      >
        CYBER WATCHLIST
      </h1>

      {watchlist.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {watchlist.map((item) => {
            const imageUrl =
              item.movie?.image_url || item.show?.image_url || item.premium_movie?.image_url;
            const title =
              item.movie?.title || item.show?.title || item.premium_movie?.title || "Untitled";
            const description =
              item.movie?.description ||
              item.show?.description ||
              item.premium_movie?.description ||
              "No description available.";
            const genre =
              item.movie?.genre || item.show?.genre || item.premium_movie?.genre || "UNKNOWN";
            const rating =
              item.movie?.rating || item.show?.rating || item.premium_movie?.rating || "N/A";
            const itemId =
              item.movie?.id || item.show?.id || item.premium_movie?.id;
            const type = item.movie
              ? "movie"
              : item.show
              ? "show"
              : "premium_movie";

            return (
              <div
                key={itemId}
                style={{
                  backgroundColor: "#1E1E1E",
                  borderRadius: "15px",
                  overflow: "hidden",
                  border: "2px solid #00ff41",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    height: "400px",
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => handleRemoveFromWatchlist(itemId, type)}
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      backgroundColor: "rgba(0,255,65,0.2)",
                      color: "#00ff41",
                      border: "2px solid #00ff41",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    ✖
                  </button>
                </div>
                <div
                  style={{
                    padding: "15px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>{genre}</p>
                  <p>Rating: {rating}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No items in your watchlist.</p>
      )}
    </div>
  );
};

export default Watchlist;
