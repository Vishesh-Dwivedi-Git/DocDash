import React, { useState, useEffect, useRef } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";

const AestheticSearchBar = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false); // Loader State
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchRAGResponse = async () => {
    if (query.length < 2) return;

    setLoading(true); // Start loading
    setAiResponse(""); // Reset previous response

    try {
      const response = await fetch("https://docdash-production.up.railway.app/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log(data);
      setSearchResults(data.results || []);
      setAiResponse(data.Response?.replace(/You are an AI assistant.*?answer the query:/i, "").trim() || "No AI response available.");

    } catch (error) {
      console.error("Error fetching RAG response:", error);
      setSearchResults([]);
      setAiResponse("Error fetching AI response.");
    }

    setLoading(false); // Stop loading
  };

  const handleSearch = () => fetchRAGResponse();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") fetchRAGResponse();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            ref={searchRef}
            className="w-full max-w-md bg-neutral-900 text-white p-5 rounded-2xl shadow-lg"
          >
            {/* Search Bar */}
            <div className="flex items-center bg-neutral-800 px-4 py-2 rounded-full shadow-md">
              <IconSearch
                className="w-6 h-6 text-gray-400 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                type="text"
                className="w-full bg-transparent outline-none text-lg px-3"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button onClick={() => setIsOpen(false)}>
                <IconX className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* AI Response */}
            {loading ? (
              <div className="mt-4 p-3 bg-neutral-800 rounded-xl shadow-inner text-gray-300 flex items-center justify-center">
                <span className="animate-pulse text-lg">⏳ Generating AI response...</span>
              </div>
            ) : (
              aiResponse && (
                <div className="mt-4 p-3 bg-neutral-800 rounded-xl shadow-inner text-gray-300">
                  <p className="font-semibold">AI Response:</p>
                  <p className="mt-2 text-white">{aiResponse}</p>
                </div>
              )
            )}

            {/* Search Results */}
            <div className="mt-4 max-h-60 overflow-auto bg-neutral-800 p-2 rounded-xl shadow-inner">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                    className="p-3 hover:bg-neutral-700 rounded-lg cursor-pointer transition-all"
                  >
                    {item.title}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-2">No results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AestheticSearchBar;
