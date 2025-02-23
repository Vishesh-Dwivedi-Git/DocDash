import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Sidebar, SidebarLink } from "./sidebar";
import { IconBrandTabler, IconUserBolt, IconShare, IconArrowAutofitLeftFilled, IconSearch } from "@tabler/icons-react";
import Button from "../../design/Button";
import SocialMediaCard from "./SocialMediaCard";
import CardPreview from "./CardPreview";
import AestheticSearchBar from "./AestheticSearchBar";

export function SidebarDemo() {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler className="text-purple-500 h-5 w-5" /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt className="text-purple-500 h-5 w-5" /> },
    { label: "Share", href: "/Share", icon: <IconShare className="text-purple-500 h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <IconArrowAutofitLeftFilled className="text-purple-500 h-5 w-5" /> },
  ];

  return (
    <div className="h-screen flex bg-black dark:bg-neutral-800 font-grotesk font-semibold mx-auto overflow-hidden text-sm md:text-base">
      <Sidebar animate={false} className="w-64">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="mt-6 flex flex-col gap-2 text-white">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </Sidebar>
      <div className="w-[1px] bg-gray-100 opacity-50 h-full mx-1"></div>
      <Dashboard />
    </div>
  );
}

const Dashboard = () => {
  const { hash } = useParams();
  const [items, setItems] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (hash) {
      fetch(`http://localhost:3000/api/v1/${hash}`)
        .then((response) => response.json())
        .then((data) => {
          setItems(data.items || []);
          setUploads(data.uploads || []);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [hash]);

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex-1 p-4 md:p-6 bg-black dark:bg-neutral-900 relative overflow-auto">
      <div className="flex justify-end items-center mb-4 relative z-10 overflow-hidden">
        <Button onClick={() => setSearchOpen(true)} className="text-xs md:text-sm px-4 py-2 text-white rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <IconSearch className="h-4 w-4" /> Search (Ctrl + K)
          </div>
        </Button>
      </div>
      <AestheticSearchBar isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      <div className="w-full bg-gray-100 opacity-50 h-0.5 mx-0"></div>
      <div className="overflow-auto">
        <div className="flex flex-wrap justify-start gap-4 mt-4">
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <SocialMediaCard type={item.type} link={item.link} title={item.title} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-start gap-4 mt-4 overflow-auto">
          {uploads.map((upload, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <CardPreview upload={upload} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo;