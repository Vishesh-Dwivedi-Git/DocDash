import React from "react";
import { FaYoutube, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const getEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  
  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = new URL(url).searchParams.get("v") || url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("twitter.com")) return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
    if (url.includes("instagram.com")) return `${url}embed/`;
    if (url.includes("linkedin.com")) return url; // LinkedIn doesn’t have direct embeds
  } catch (error) {
    console.error("Invalid URL format", error);
  }
  return null;
};

const getPlatformIcon = (url) => {
  if (!url || typeof url !== "string") return null;
  
  if (url.includes("youtube.com") || url.includes("youtu.be")) return <FaYoutube className="text-red-500 text-xl" />;
  if (url.includes("twitter.com")) return <FaTwitter className="text-blue-400 text-xl" />;
  if (url.includes("instagram.com")) return <FaInstagram className="text-pink-500 text-xl" />;
  if (url.includes("linkedin.com")) return <FaLinkedin className="text-blue-600 text-xl" />;
  return null;
};

const SocialMediaCard = ({ title, description, link }) => {
  if (!link) return null; // Prevent rendering if link is missing
  
  const embedUrl = getEmbedUrl(link);
  const platformIcon = getPlatformIcon(link);
  
  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-2">
        {platformIcon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full h-60 rounded-lg"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
          View Post
        </a>
      )}
    </div>
  );
};

export default SocialMediaCard;
