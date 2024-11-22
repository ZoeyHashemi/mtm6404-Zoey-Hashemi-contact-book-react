import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db"; // Firebase Firestore instance

const EditContact = () => {
  const { id } = useParams(); // Get the contact ID from the route parameter
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    company: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch the contact data from Firestore when the component loads
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data()); // Pre-fill the form with contact data
        } else {
          console.error("No such document!");
          navigate("/"); // Redirect to the home page if contact not found
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, formData); // Update the contact in Firestore
      navigate(`/contact/${id}`); // Navigate to the ContactDetail page
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading contact details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/contact/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
