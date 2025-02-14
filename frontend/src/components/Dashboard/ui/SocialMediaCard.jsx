import React from "react";
import PropTypes from "prop-types";
import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTrash,
  FaShareAlt,
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

export function SocialMediaCard({ title, link, type }) {
  return (
    <div className="relative p-4 bg-black bg-opacity-50 backdrop-blur-md rounded-2xl border border-purple-500 shadow-lg transition-transform transform hover:scale-105 max-w-80 min-w-72">
      <div className="absolute top-2 right-2 flex gap-2">
       
        <FaTrash className="text-red-500 hover:text-red-700 transition duration-300 cursor-pointer" title="Delete Post" />
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
    </div>
  );
}

// ✅ Define PropTypes for type checking
SocialMediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["twitter", "youtube", "instagram", "linkedin"]).isRequired,
};

export default SocialMediaCard;
