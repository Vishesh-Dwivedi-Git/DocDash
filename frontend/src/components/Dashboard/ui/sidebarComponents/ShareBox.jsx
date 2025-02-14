import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Copy } from "lucide-react";
import { useShareStore } from "../../../../Store";   

const ShareBox = () => {
  const { showShareBox, shareLink, copied, setShowShareBox, setShareLink, setCopied } = useShareStore();

  console.log("🔄 ShareBox Component Rendered - showShareBox:", showShareBox);

  useEffect(() => {
    console.log("🛠️ useEffect triggered - showShareBox:", showShareBox);
    if (showShareBox) {
      fetch("http://localhost:3000/api/v1/share")
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ API Response:", data);
          setShareLink(data.link);
        })
        .catch((err) => console.error("❌ Error fetching share link:", err));
    }
  }, [showShareBox, setShareLink]);

  if (!showShareBox) return null; // Prevents unnecessary rendering

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 p-4 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Share Dashboard</h2>
          <button onClick={() => setShowShareBox(false)}>
            <X className="text-white hover:text-gray-400" size={20} />
          </button>
        </div>
        <div className="flex items-center bg-gray-700 p-2 rounded-lg">
          <input type="text" value={shareLink} readOnly className="bg-transparent text-white w-full outline-none" />
          <button onClick={() => { navigator.clipboard.writeText(shareLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            <Copy className="text-white hover:text-gray-400" size={20} />
          </button>
        </div>
        {copied && <p className="text-green-400 text-sm mt-2">Link copied!</p>}
      </motion.div>
    </div>
  );
};

export default ShareBox;
