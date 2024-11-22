import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db";
import "../App.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredContacts, setFilteredContacts] = useState([]); // State for filtered contacts

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const fetchedContacts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort contacts alphabetically by last name
        fetchedContacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts); // Initialize filtered contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    const results = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  return (
    <div>
      <h1>Home: List of Contacts</h1>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {/* Display filtered contacts */}
      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
