import React from "react";
import PropTypes from "prop-types";
import { FaYoutube, FaTwitter, FaInstagram, FaLinkedin, FaTrash, FaShareAlt } from "react-icons/fa";
import {XEmbed,InstagramEmbed,LinkedInEmbed,YouTubeEmbed} from 'react-social-media-embed'
const platformIcons = {
  youtube: <FaYoutube className="text-red-500 text-xl" />, 
  twitter: <FaTwitter className="text-blue-400 text-xl" />, 
  instagram: <FaInstagram className="text-pink-500 text-xl" />, 
  linkedin: <FaLinkedin className="text-blue-600 text-xl" />,
};

export function SocialMediaCard({ title, link, type }) {
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-40 border max-h-56 min-w-72">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">{platformIcons[type]}</div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <FaShareAlt className="cursor-pointer hover:text-gray-700 transition" />
            </a>
          </div>
          <div className="text-red-400 cursor-pointer hover:text-red-600">
            <FaTrash title="Delete Post" />
          </div>
        </div>
      </div>

      <div className="pt-4">
      {type==="youtube" && 
        <YouTubeEmbed url={link} width="100%" height="100%"/>
      }
        {type==="instagram" && 
        <InstagramEmbed url={link} width="100%" height={150}/>
      }
      {
        type=="linkedin" && 
        <LinkedInEmbed url={link} width="100%" height={150}/>
      }
        {type==="twitter" && 
        <XEmbed url={link} width="100%" height={150}/>
      }
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
