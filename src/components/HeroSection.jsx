import React, { useState, useEffect } from "react";
import axios from "axios";

// Use the environment variable for the Unsplash Access Key
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const HeroSection = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: { query: "nature", orientation: "landscape" },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`, 
            },
          }
        );
        setBackgroundImage(response.data.urls.regular);
      } catch (err) {
        console.error("Error fetching image from Unsplash:", err);
        setError(err.message || "Failed to load background image.");
      }
    };

    fetchImage();
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        height: "300px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div>
          <h1>Welcome to Your Contact Book</h1>
          <p>Effortlessly manage your contacts and keep in touch!</p>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
