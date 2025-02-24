import React, { useState } from "react";
import axios from "axios";
import useStore from "../../../store"; // Ensure this path is correct
import { useUploadStore } from "../../../store";

const AestheticForm = () => {
  const [loading, setLoading] = useState(false);
  const { addItem, resetItems } = useStore(); 

  const [formData, setFormData] = useState({
    link: "",
    type: "",
    title: ""
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

    if (!formData.title || !formData.type || !formData.link) {
      console.error("All fields are required.");
      return;
    }

    setLoading(true);

    const data = {
      link: formData.link,
      type: formData.type,
      title: formData.title,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve token

      const response = await axios.post("https://docdash-backend.onrender.com/api/v1/content", data, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "", // Add token to headers
        },
      });

      console.log("Response:", response.data);
      addItem(formData.link, formData.type, formData.title);

      alert("Form submitted successfully!");
      setFormData({ link: "", type: "", title: "" });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Failed to submit the form.");
    } finally {
      setLoading(false);
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

      {/* Type Input */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-white">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
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
          onClick={() => setFormData({ link: "", type: "", title: "" })}
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




export const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const { addUpload } = useUploadStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    fileType: "", // fileType input added here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData((prevData) => ({
        ...prevData,
        file: selectedFile,
        // Automatically setting fileType to the type of the selected file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.file || !formData.fileType) {
      console.error("All fields are required.");
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file);
    data.append("fileType", formData.fileType); // File type is included here

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://docdash-backend.onrender.com/api/v1/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token || "",
        },
      });
      console.log("Response:", response.data);
      addUpload(response.data.upload);
      alert("Upload successful!");
      setFormData({ title: "", description: "", file: null, fileType: "" });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white rounded-2xl shadow-2xl space-y-6 max-w-xl"
    >
      <h2 className="text-3xl font-bold text-white text-center">Upload Your Content</h2>

      <div>
        <label className="block text-sm font-medium text-white">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Upload File (PDF, Image, Video)</label>
        <input
          type="file"
          accept="image/*, video/*, application/pdf"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Select File Type(pdf,image,video)</label>
        <select
          name="fileType"
          value={formData.fileType}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="">Select File Type</option>
          <option value="image">image</option>
          <option value="video">video</option>
          <option value="pdf">pdf</option>
        </select>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="reset"
          onClick={() => setFormData({ title: "", description: "", file: null, fileType: "" })}
          className="px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};