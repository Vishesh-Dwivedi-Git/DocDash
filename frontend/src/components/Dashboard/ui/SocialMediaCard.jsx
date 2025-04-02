import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTrash,
} from "react-icons/fa";
import {
  XEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

const platformIcons = {
  youtube: <FaYoutube className="text-red-500 text-2xl" />,
  twitter: <FaTwitter className="text-blue-400 text-2xl" />,
  instagram: <FaInstagram className="text-pink-500 text-2xl" />,
  linkedin: <FaLinkedin className="text-blue-600 text-2xl" />,
};

const Toast = ({ message, type, onClose }) => {
  return (
    <div 
      className={`fixed top-4 right-4 p-4 rounded-xl shadow-lg border transition-all duration-300 transform translate-x-0 z-50
        ${type === "success" ? "bg-green-900 bg-opacity-80 border-green-500 text-green-200" : 
          "bg-red-900 bg-opacity-80 border-red-500 text-red-200"}`}
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-xl hover:text-white transition-colors">
          ×
        </button>
      </div>
    </div>
  );
};

export default function SocialMediaCard({ title, link, type, itemId }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://docdash-production.up.railway.app/api/social-media/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (response.status === 200 && response.data.message === "Deleted") {
        setIsDeleted(true);
        showToast("Post deleted successfully", "success");
      } else {
        showToast("Failed to delete post", "error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      if (error.response) {
        if (error.response.status === 404) {
          showToast("Post not found or not authorized", "error");
        } else if (error.response.status === 401) {
          showToast("Unauthorized - Invalid token", "error");
        } else {
          showToast(`Error: ${error.response.data.message || "Failed to delete post"}`, "error");
        }
      } else {
        showToast("Network error - please try again", "error");
      }
    }
  };

  if (isDeleted) {
    return (
      <div className="p-4 text-white bg-black bg-opacity-50 rounded-2xl border border-purple-500">
        Post Deleted
      </div>
    );
  }

  return (
    <div className="relative p-4 bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500 shadow-lg transition-transform transform hover:scale-105 max-w-80 min-w-72">
      <div className="absolute top-2 right-2 flex gap-2">
        <FaTrash 
          className="text-red-500 hover:text-red-700 transition duration-300 cursor-pointer" 
          title="Delete Post"
          onClick={handleDelete}
        />
      </div>

      <div className="flex items-center gap-2 text-lg font-semibold text-white">
        <span>{platformIcons[type]}</span>
        <span>{title}</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl">
        {type === "youtube" && <YouTubeEmbed url={link} width="100%" height="160px" />}
        {type === "instagram" && <InstagramEmbed url={link} width="100%" height="160px" />}
        {type === "linkedin" && <LinkedInEmbed url={link} width="100%" height="160px" />}
        {type === "twitter" && <XEmbed url={link} width="100%" height="160px" />}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

SocialMediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["twitter", "youtube", "instagram", "linkedin"]).isRequired,
  id: PropTypes.string.isRequired,
};