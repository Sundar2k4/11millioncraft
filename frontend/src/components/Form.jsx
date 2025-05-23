import React, { useState } from "react";
import axios from "axios";
import "./form.css";

const Form = () => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("productId", productId);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "https://one1millioncraft-backend.onrender.com/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
          },
        }
      );

      // Use the response to show a success message
      setMessage(response.data.message || "Product added successfully!");
      setProductName("");
      setProductId("");
      setImage(null);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        setMessage(
          `Error: ${
            error.response.data.message ||
            "Error adding product. Please try again."
          }`
        );
      } else {
        console.error("Error:", error);
        setMessage("Error adding product. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        marginTop: "20vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px", marginTop: "20px" }}>
          <h2>Add Product</h2>
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Product ID:
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Product Image:
            <input
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: "5px" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
};

export default Form;
