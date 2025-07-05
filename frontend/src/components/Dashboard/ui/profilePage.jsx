import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar, SidebarLink } from "./sidebar";
import { IconArrowAutofitLeftFilled, IconBrandTabler, IconUserBolt, IconShare } from "@tabler/icons-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: "", uploadsCount: 0, contentCount: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("https://docdash-production.up.railway.app/api/v1/profile", {
      headers: {
        "x-auth-token": token || "", // Add token to headers
      },
    })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to fetch profile", err));
  }, []);

  return (
    <div className="flex flex-col items-center p-6 text-purple-400">
      <div className="w-full max-w-3xl bg-grid-small-slate-300 shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border border-purple-500">
        {/* Left Side - Avatar & Name */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-24 h-24 bg-purple-600 rounded-full mb-4 border-4 border-purple-400"></div>
          <h2 className="text-3xl font-bold text-purple-100">{profile.username}</h2>
        </div>

        {/* Right Side - Profile Stats */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-200 text-lg">
          <div className="bg-purple-800 p-4 rounded-lg shadow-md border border-purple-400">
            <p className="text-purple-100 font-semibold">Total Uploads</p>
            <p className="text-2xl font-bold text-white">{profile.uploadsCount}</p>
          </div>
          <div className="bg-purple-800 p-4 rounded-lg shadow-md border border-purple-400">
            <p className="text-purple-100 font-semibold">Total Content</p>
            <p className="text-2xl font-bold text-white">{profile.contentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileLayout = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler className="text-purple-500 h-5 w-5" /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt className="text-purple-500 h-5 w-5" /> },
    { label: "Share", href: "share", icon: <IconShare className="text-purple-500 h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <IconArrowAutofitLeftFilled className="text-purple-500 h-5 w-5" /> },
  ];

  return (
    <div className="h-screen flex bg-black dark:bg-neutral-900 font-grotesk font-semibold mx-auto overflow-hidden text-sm md:text-base">
      <Sidebar animate={false} className="w-64 bg-purple-900">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="mt-6 flex flex-col gap-2 text-white">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </Sidebar>
      <div className="w-[1px] bg-white opacity-50 h-full mx-1"></div>
      <div className="flex-1 p-6 bg-black dark:bg-neutral-900 overflow-auto flex justify-center items-center">
        <ProfilePage />
      </div>
    </div>
  );
};

export default ProfileLayout;