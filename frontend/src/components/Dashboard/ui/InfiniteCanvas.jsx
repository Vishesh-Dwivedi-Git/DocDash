import React, { useState, useEffect } from "react";
import SocialMediaCard from "./SocialMediaCard";
import useStore from "../../../Store";

const InfiniteCanvas = () => {
  const { items } = useStore(); // Fetching items from global state
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    console.log(items); // Debugging the fetched items
    if (items.length > 0) {
      setLocalItems(items); // Simply set the items without modifying position
    }
  }, [items]);

  if (!items || items.length === 0) {
    return <div>Loading...</div>; // Show loading if items are not loaded
  }

  return (
    <div className="h-[90vh] w-full bg-black p-4 border border-gray-700">
      {/* Render the items in a simple flow */}
      <div className="space-y-4 flex overflow-x-auto">
        {localItems.map((item) => (
          <div key={item.id} className="p-2 shadow-md bg-gray-800 rounded-lg w-fit ">
            {/* Only passing type, link, title to the SocialMediaCard */}
            <SocialMediaCard type={item.type} link={item.link} title={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCanvas;
