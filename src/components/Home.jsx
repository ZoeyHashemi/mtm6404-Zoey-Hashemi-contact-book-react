import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db";
import { Link } from "react-router-dom"; // Import Link
import "../App.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const fetchedContacts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        fetchedContacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const results = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h1 className="text-center mb-4">Contact List</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-4"
          />

          {/* Contact List */}
          <ul className="list-group">
            {filteredContacts.map((contact) => (
              <li key={contact.id} className="list-group-item">
                {/* Link to the details page */}
                <Link to={`/contact/${contact.id}`} className="text-decoration-none">
                  {contact.firstName} {contact.lastName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
