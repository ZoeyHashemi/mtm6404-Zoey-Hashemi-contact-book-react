import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../db"; // Firebase Firestore instance

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Manage sort order
  const navigate = useNavigate();

  // Fetch contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const fetchedContacts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(fetchedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Filtered and sorted contacts
  const filteredContacts = [...contacts]
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName);
    })
    .filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  // Delete a Contact
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Toggle Sort Order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Export Contacts to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("My Contact Book", 10, 10);

    let y = 20;
    contacts.forEach((contact, index) => {
      const contactText = `${index + 1}. ${contact.firstName || ""} ${
        contact.lastName || ""
      } - ${contact.email || ""} - `;
      doc.text(contactText, 10, y);
      y += 10;
    });

    doc.save("contact_book.pdf");
  };

  // Export Contacts to Word
  const exportToWord = () => {
    let content = "My Contact Book\n\n";
    contacts.forEach((contact, index) => {
      content += `${index + 1}. ${contact.firstName || ""} ${
        contact.lastName || ""
      } - ${contact.email || ""} -  \n`;
    });

    const blob = new Blob([content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, "contact_book.doc");
  };

  return (
    <div className="home-view container mt-5">
      <h1 className="text-center mb-4">My Contact Book</h1>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 col-sm-10">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            placeholder="Search by name"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th onClick={toggleSortOrder} className="sortable">
                Name {sortOrder === "asc" ? "🔽" : "🔼"}
              </th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="contact-row">
                <td className="contact-cell">
                  <div className="profile-icon">
                    {contact.imageUrl && <img src={contact.imageUrl} alt="Profile" />}
                  </div>
                  <span
                      onClick={() => {
                        console.log("Navigating to:", `/contact/${contact.id}`);
                        navigate(`/contact/${contact.id}`);
                      }}
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    {contact.lastName}, {contact.firstName}
                  </span>
                </td>
                <td>{contact.email}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from triggering row navigation
                      navigate(`/edit/${contact.id}`); // Navigate to EditContact page
                    }}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from triggering row navigation
                      deleteContact(contact.id); // Delete the contact
                    }}
                    className="btn btn-sm btn-outline-danger"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button onClick={exportToPDF} className="btn btn-secondary me-2">
            Export to PDF
          </button>
          <button onClick={exportToWord} className="btn btn-secondary">
            Export to Word
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
