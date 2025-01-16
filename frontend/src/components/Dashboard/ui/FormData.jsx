import React, { useState } from "react";
import axios from "axios";

const AestheticForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Update file or input value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await axios.post("http://your-backend-endpoint.com/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-gradient-to-r from-purple-800 via-purple-900 to-gray-900 text-white rounded-3xl shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-purple-300">Upload Your Content</h2>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-purple-200">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="mt-1 w-full p-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-purple-200">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows="4"
          className="mt-1 w-full p-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-purple-200">
          Upload File/Video
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={handleChange}
          accept="video/*,image/*"
          className="mt-1 w-full text-white bg-purple-700 rounded-lg file:bg-purple-600 file:text-white file:font-medium file:px-4 file:py-2 file:border-none file:rounded-md hover:file:bg-purple-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="reset"
          onClick={() => setFormData({ title: "", description: "", file: null })}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AestheticForm;
