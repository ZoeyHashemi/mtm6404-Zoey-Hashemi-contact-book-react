import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Hook for navigation
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db";

const ContactDetails = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const navigate = useNavigate(); // For navigation
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContact(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return (
      <div className="container text-center mt-5">
        <p className="text-muted">Loading contact details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">
                {contact.firstName} {contact.lastName}
              </h1>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Email:</strong> {contact.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {contact.phone}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {contact.address}
                </li>
                <li className="list-group-item">
                  <strong>Company:</strong> {contact.company}
                </li>
              </ul>
              <div className="d-flex justify-content-between mt-4">
                {/* Back to Contacts Button */}
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Back to Contacts
                </button>
                {/* Edit Contact Button */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  Edit Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
