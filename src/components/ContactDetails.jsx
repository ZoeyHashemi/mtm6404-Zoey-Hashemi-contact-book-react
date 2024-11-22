import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Hooks for routing
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db"; // Firebase Firestore instance

const ContactDetails = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const navigate = useNavigate(); // For navigation
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the contact data from Firestore when the component loads
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContact(docSnap.data());
        } else {
          console.error("No such document!");
          navigate("/"); // Redirect to home if the contact does not exist
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, navigate]);

  // Handle delete contact
  const deleteContact = async () => {
    try {
      const docRef = doc(db, "contacts", id);
      await deleteDoc(docRef); // Delete the document from Firestore
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading contact details...</p>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="container text-center mt-5">
        <p>Contact not found. Please return to the contact list.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Contact List
        </button>
      </div>
    );
  }

  return (
    <div className="contact-detail-view container mt-5">
      <h2 className="text-center mb-4">Contact Details</h2>
      <div className="contact-detail-content text-center">
        <img
          src="/src/assets/images/contact-information.png"
          alt="Contact Information"
          className="img-fluid mb-4"
        />
        <div className="contact-info">
          <p>
            <strong>Name:</strong> {contact.firstName} {contact.lastName}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Address:</strong> {contact.address}
          </p>
          <p>
            <strong>Company:</strong> {contact.company}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        {/* Edit Contact Button */}
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit Contact
        </button>
        {/* Delete Contact Button */}
        <button className="btn btn-danger me-2" onClick={deleteContact}>
          Delete Contact
        </button>
        {/* Back to Contacts Button */}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Back to Contact List
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
