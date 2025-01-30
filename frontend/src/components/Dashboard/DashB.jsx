import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconUserPlus,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../design/Button";
import ExpandableCard from "./ui/ExpandableCard";
import AestheticForm from "./ui/FormData";
import UsernameInput from "./ui/Username";

export function SidebarDemo() {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler className="text-purple-500 h-5 w-5" /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt className="text-purple-500 h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="text-purple-500 h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <IconArrowLeft className="text-purple-500 h-5 w-5" /> },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex bg-black dark:bg-neutral-800 font-grotesk font-bold mx-auto overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} animate={false} className="w-64">
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <SidebarLink
            link={{
              label: "Manu Arora",
              href: "#",
              icon: <img src="https://assets.aceternity.com/manu.png" className="h-7 w-7 rounded-full" alt="Avatar" />,
            }}
          />
        </SidebarBody>
      </Sidebar>

      {/* Aesthetic Thin Separator Line */}
      <div className="w-[1px] bg-gray-00 opacity-50 h-full mx-1"></div>

      <Dashboard />
    </div>
  );
}

export const Logo = () => (
  <Link to="/" className="flex items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white">
      Acet Labs
    </motion.span>
  </Link>
);

const Dashboard = () => {
  const [isCardActive, setIsCardActive] = useState(false);
  const [isActiveUser, setActiveUser] = useState(false);

  return (
    <div className="flex-1 p-4 md:p-6 bg-black dark:bg-neutral-900">
      <div className="flex justify-around items-center mb-4">
        <Button onClick={() => setActiveUser(true)} className="text-lg">
          <div className="flex items-center gap-2">
            <IconUserPlus className="h-5 w-5" /> Add User
          </div>
        </Button>
        <ExpandableCard isActive={isActiveUser} onClose={() => setActiveUser(false)} content={<UsernameInput />} />

        <Button onClick={() => setIsCardActive(true)} className="text-lg">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M12 12.75m-4 0a4 1.75 0 1 0 8 0a4 1.75 0 1 0 -8 0" />
              <path d="M8 12.5v3.75c0 .966 1.79 1.75 4 1.75s4 -.784 4 -1.75v-3.75" />
            </svg>
            Add Asset
          </div>
        </Button>
        <ExpandableCard isActive={isCardActive} onClose={() => setIsCardActive(false)} content={<AestheticForm />} />
      </div>

      {/* Dashboard Content */}
      <div className="h-full w-full bg-slate-700 rounded-md" />
    </div>
  );
};
