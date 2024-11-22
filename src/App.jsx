import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/FooterTemp";


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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
