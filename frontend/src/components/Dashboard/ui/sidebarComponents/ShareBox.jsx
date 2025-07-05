import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Copy } from "lucide-react";
import { useShareStore } from "../../../../Store"; // Import Zustand store   

const ShareBox = () => {
  const { showShareBox, shareLink, copied, setShowShareBox, setShareLink, setCopied } = useShareStore();

  useEffect(() => {
    if (showShareBox) {
      fetch("https://docdash-production.up.railway.app/api/v1/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ share: true }),
      })
        .then((res) => res.json())
        .then((data) => {
          setShareLink(`https://docdash-production.up.railway.app/${data.hash}`);
        })
        .catch((err) => console.error("Error fetching share link:", err));
    }
  }, [showShareBox, setShareLink]);

  const handleClose = () => {
    setShowShareBox(false);
    setShareLink("");
  };

  if (!showShareBox) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-purple-950 bg-opacity-80 p-6 rounded-xl shadow-2xl w-96 border border-purple-500"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold font-grotesk">Share Dashboard</h2>
          <button onClick={handleClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <div className="flex items-center bg-purple-900 bg-opacity-60 p-3 rounded-lg border border-purple-600">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="bg-transparent text-white w-full outline-none font-code"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="ml-2 text-white hover:text-gray-300"
          >
            <Copy size={22} />
          </button>
        </div>
        {copied && <p className="text-green- text-white sm mt-2 font-grotesk">Link copied!</p>}
      </motion.div>
    </div>
  );
};

export default ShareBox;