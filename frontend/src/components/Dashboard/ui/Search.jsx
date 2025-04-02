import { useCallback } from "react";
import { debounce } from "lodash";
import useStore, { useUploadStore } from "../../../Store";
import { X, Search } from "lucide-react";
import { motion } from "framer-motion";

const SearchBar = ({ isOpen, onClose }) => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const setUploadSearchQuery = useUploadStore((state) => state.setSearchQuery);

  // Debounce function to delay state update
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setUploadSearchQuery(value);
    }, 300),
    []
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 transition-all">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-purple-950 bg-opacity-70 p-6 rounded-xl shadow-2xl w-96 max-w-full relative border border-purple-500"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white opacity-70 hover:opacity-100 transition-all duration-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-white text-lg font-semibold font-grotesk mb-4 text-center">🔍 Search</h2>

        {/* Search Input */}
        <div className="flex items-center bg-purple-900 bg-opacity-70 px-4 py-3 rounded-lg border border-purple-600 shadow-md">
          <Search size={20} className="text-white mr-2" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-white text-lg placeholder-purple-300 font-code"
            placeholder="Type to search..."
            onChange={handleSearch}
            autoFocus
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBar;