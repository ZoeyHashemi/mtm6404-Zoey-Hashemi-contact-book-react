import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import NotFound from "./components/NotFound";
import ComingSoon from "./components/ComingSoon";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/FooterTemp";
import './App.css';


function App() {
  const backgroundImage = "/path-to-your-background-image.jpg"; 

  return (
       <Router>
      <div id="app">
        <Navbar />
        <HeroSection backgroundImage={backgroundImage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/edit/:id" element={<EditContact />} /> 
          <Route path="/help" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
