import { useCallback } from "react";
import { debounce } from "lodash"; // Install lodash with: npm install lodash
import useStore, { useUploadStore } from "../../../store";
import { X, Search } from "lucide-react"; // Install lucide icons with: npm install lucide-react

const SearchBar = ({ isOpen, onClose }) => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const setUploadSearchQuery = useUploadStore((state) => state.setSearchQuery);

  // Debounce function to delay state update
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setUploadSearchQuery(value);
    }, 300), // Waits 300ms before updating state
    []
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 transition-all">
          <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-6 rounded-2xl shadow-2xl w-96 max-w-full relative border border-purple-400/50">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white opacity-70 hover:opacity-100 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-white text-xl font-semibold mb-4 text-center">🔍 Search</h2>

            {/* Search Input */}
            <div className="flex items-center bg-purple-800/40 px-4 py-2 rounded-full shadow-md backdrop-blur-md border border-purple-500/40">
              <Search size={20} className="text-purple-300" />
              <input
                type="text"
                className="w-full bg-transparent outline-none text-white text-lg px-3 placeholder-gray-300"
                placeholder="Type to search..."
                onChange={handleSearch}
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
