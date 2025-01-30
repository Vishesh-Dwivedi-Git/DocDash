import React, { useState } from "react";
import axios from "axios";
import Store from "../../../store"; // Ensure this path is correct

const AestheticForm = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const { addItem, resetItems } = Store(); // Destructure the store to add items to the global state

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!formData.title || !formData.description || !formData.link) {
      console.error("All fields are required.");
      return;
    }

    setLoading(true); // Set loading to true when starting the request

    // Prepare the data for submission
    const data = {
      title: formData.title,
      description: formData.description,
      link: formData.link,
    };

    try {
      const response = await axios.post("http://your-backend-endpoint.com/addItem", data);
      console.log("Response:", response.data);
      
      // Only update the global state after a successful submission
      addItem(formData.title, formData.description, formData.link);

      alert("Form submitted successfully!");
      setFormData({ title: "", description: "", link: "" }); // Reset the form after successful submission
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Failed to submit the form.");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white rounded-2xl shadow-2xl space-y-6 max-w-xl"
    >
      <h2 className="text-3xl font-bold text-white text-center">Share Your Content</h2>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      {/* Link Input */}
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-white">Link</label>
        <input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between space-x-4">
        <button
          type="reset"
          onClick={() => setFormData({ title: "", description: "", link: "" })}
          className="px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AestheticForm;
