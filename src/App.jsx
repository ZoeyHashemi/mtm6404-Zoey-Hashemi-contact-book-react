import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home view: Displays the list of contacts */}
        <Route path="/" element={<Home />} />

        {/* Details view: Displays the details of a specific contact */}
        <Route path="/contact/:id" element={<ContactDetails />} />

        {/* Add contact view: Form to add a new contact */}
        <Route path="/add" element={<AddContact />} />

        {/* Edit contact view: Form to edit an existing contact */}
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Router>
  );
}

export default App;
