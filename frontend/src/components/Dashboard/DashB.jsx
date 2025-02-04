import React, { useEffect, useState } from "react";
import { Sidebar, SidebarLink } from "./ui/sidebar";
import {
  IconArrowAutofitLeftFilled,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconUserPlus,
} from "@tabler/icons-react";
import Button from "../design/Button";
import ExpandableCard from "./ui/ExpandableCard";
import AestheticForm, { UploadForm } from "./ui/FormData";
import UsernameInput from "./ui/Username";
import useStore from "../../store";
import SocialMediaCard from "./ui/SocialMediaCard";
import { useUploadStore } from "../../store"; // Import your Zustand store for uploads
import CardPreview from "./ui/CardPreview";




// SidebarDemo Component
export function SidebarDemo() {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler className="text-purple-500 h-5 w-5" /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt className="text-purple-500 h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="text-purple-500 h-5 w-5" /> },
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

// Dashboard Component
const Dashboard = () => {
  const { items, fetchItems } = useStore();
  const [isCardActive, setIsCardActive] = useState(false);
  const [isActiveUser, setActiveUser] = useState(false);
  const [isUploadActive, setUploadActive] = useState(false);
  const {fetchUploads}=useUploadStore();

  const uploads = useUploadStore((state) => state.uploads); // Get uploads from Zustand store

  useEffect(() => {
    fetchItems();
    fetchUploads();
    console.log(uploads);
  }, []);

  console.log(items);

  return (
    <div className="flex-1 p-4 md:p-6 bg-black dark:bg-neutral-900 relative overflow-hidden">
      <div className="flex justify-around items-center mb-4 relative z-10">
        <Button
          onClick={() => setActiveUser(true)}
          className="text-xs md:text-sm px-4 py-2 text-white rounded-lg shadow-md transition-all"
        >
          <div className="flex items-center gap-2">
            <IconUserPlus className="h-4 w-4" /> Add User
          </div>
        </Button>
        <ExpandableCard isActive={isActiveUser} onClose={() => setActiveUser(false)} content={<UsernameInput />} />
        <Button
          onClick={() => setIsCardActive(true)}
          className="text-xs md:text-sm px-4 py-2 text-white rounded-lg shadow-md transition-all"
        >
          <div className="flex items-center gap-2">Add Asset</div>
        </Button>
        <ExpandableCard isActive={isCardActive} onClose={() => setIsCardActive(false)} content={<AestheticForm />} />
        <Button
          onClick={() => setUploadActive(true)}
          className="text-xs md:text-sm px-4 py-2 text-white rounded-lg shadow-md transition-all"
        >
          <div className="flex items-center gap-2">Add Upload</div>
        </Button>
        <ExpandableCard isActive={isUploadActive} onClose={() => setUploadActive(false)} content={<UploadForm />} />
      </div>

      <div className="w-full bg-gray-100 opacity-50 h-0.5 mx-0"></div>



      {/* Render SocialMediaCard and CardPreview here */}
      <div className="flex flex-wrap justify-start gap-4 mt-4">
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <SocialMediaCard type={item.type} link={item.link} title={item.title} />
          </div>
        ))}
      </div>

      {/* Add CardPreview for uploads */}
      <div className="flex flex-wrap justify-start gap-4 mt-4">
        {uploads.map((upload, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <CardPreview upload={upload} />
          </div>
        ))}
      </div>
      </div>
  );
};
