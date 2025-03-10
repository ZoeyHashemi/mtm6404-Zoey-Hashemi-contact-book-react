import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-light text-center mt-4 p-4 custom-footer">
      <p>
        &copy; 2024 Contact Book Application By Zoey Hashemi.<br />
        All rights reserved. Images provided by{" "}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Unsplash
        </a>
      </p>
      <div>
        <a href="/notfound" className="footer-link">Privacy Policy</a> |{" "}
        <a href="/notfound" className="footer-link">Terms of Service</a> |{" "}
        <a href="/comingsoon" className="footer-link">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
