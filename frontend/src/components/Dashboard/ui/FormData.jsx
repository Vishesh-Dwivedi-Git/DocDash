import React, { useState } from "react";
import axios from "axios";
import useStore ,{useUploadStore} from "../../../Store";
import { motion } from "framer-motion";

// Define allowed content types
const contentTypes = ["youtube", "twitter", "instagram", "linkedin"];

const AestheticForm = () => {
  const [loading, setLoading] = useState(false);
  const { addItem, resetItems } = useStore();

  const [formData, setFormData] = useState({
    link: "",
    type: "",
    title: "",
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
      const token = localStorage.getItem("token");
      const response = await axios.post("https://docdash-production.up.railway.app/api/v1/content", data, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="mx-auto p-6 bg-purple-950 bg-opacity-80 rounded-xl shadow-2xl max-w-xl border border-purple-500"
    >
      <h2 className="text-white text-lg font-semibold font-grotesk mb-6">Add your Link/Post</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-white text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        />
      </div>

      {/* Type Dropdown */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-white text-sm font-medium mb-2">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        >
          <option value="" className="bg-purple-900">
            Select Type
          </option>
          {contentTypes.map((type) => (
            <option key={type} value={type} className="bg-purple-900">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Link Input */}
      <div className="mb-6">
        <label htmlFor="link" className="block text-white text-sm font-medium mb-2">
          Link
        </label>
        <input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between space-x-4">
        <button
          type="reset"
          onClick={() => setFormData({ link: "", type: "", title: "" })}
          className="px-6 py-2 bg-purple-900 bg-opacity-60 text-white rounded-lg border border-purple-600 hover:bg-purple-800 transition-all duration-200"
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </motion.form>
  );
};

export default AestheticForm;

// The UploadForm remains unchanged as per your request
export const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const { addUpload } = useUploadStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    fileType: "",
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
    data.append("fileType", formData.fileType);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://docdash-production.up.railway.app/api/v1/upload", data, {
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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="mx-auto p-6 bg-purple-950 bg-opacity-80 rounded-xl shadow-2xl max-w-xl border border-purple-500"
    >
      <h2 className="text-white text-lg font-semibold font-grotesk mb-6">Upload Your Content</h2>

      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">Upload File (PDF, Image, Video)</label>
        <input
          type="file"
          accept="image/*, video/*, application/pdf"
          onChange={handleFileChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-200"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">Select File Type</label>
        <select
          name="fileType"
          value={formData.fileType}
          onChange={handleChange}
          required
          className="w-full p-3 bg-purple-900 bg-opacity-60 rounded-lg border border-purple-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        >
          <option value="" className="bg-purple-900">Select File Type</option>
          <option value="image" className="bg-purple-900">Image</option>
          <option value="video" className="bg-purple-900">Video</option>
          <option value="pdf" className="bg-purple-900">PDF</option>
        </select>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="reset"
          onClick={() => setFormData({ title: "", description: "", file: null, fileType: "" })}
          className="px-6 py-2 bg-purple-900 bg-opacity-60 text-white rounded-lg border border-purple-600 hover:bg-purple-800 transition-all duration-200"
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </motion.form>
  );
};