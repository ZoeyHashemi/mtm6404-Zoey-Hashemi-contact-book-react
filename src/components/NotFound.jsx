import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="image-container">
        <img
          src="/src/assets/images/404-2.png"
          alt="404 Not Found"
          className="not-found-image"
        />
      </div>
      <div className="not-found text-center mt-5">
        <h1 className="display-4 custom-heading">404</h1>
        <p className="lead">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
  
};

export default NotFound;
