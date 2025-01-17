
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconUserPlus
} from "@tabler/icons-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { motion } from "framer-motion";
import Button from "../design/Button";
import ExpandableCard from "./ui/ExpandableCard";
import AestheticForm from "./ui/FormData";
import UsernameInput from "./ui/Username";
export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard", // Update href to match the route
      icon: (
        <IconBrandTabler className="text-purple-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile", // Update href to match the route
      icon: (
        <IconUserBolt className="text-purple-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings", // Update href to match the route
      icon: (
        <IconSettings className="text-purple-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout", // Update href to match the route
      icon: (
        <IconArrowLeft className="text-purple-500 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className="h-screen max-w-full rounded-md flex flex-col md:flex-row bg-black dark:bg-neutral-800 w-full flex-1 font-grotesk font-bold  mx-auto overflow-hidden "
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/" // Update to use 'to' from react-router-dom
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/" // Update to use 'to' from react-router-dom
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  const [isCardActive,setIsCardActive] = useState(false);
  const [isActiveUser,setActiveUser] = useState(false);
  const handleClick1=()=>{
    setIsCardActive(true);
  }

  const handleClick2=()=>{  
     setActiveUser(true);
  }

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl dark:border-neutral-700 bg-black dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <div className="flex justify-around items-center">
  {/* Add User Button */}
  <Button className="font-code font-semibold text-lg" onClick={handleClick2}>
  <div className="flex flex-row justify-center items-center gap-2">
  <IconUserPlus className="h-5 w-5" />
  Add User
  </div>
  </Button>
  {/* The ExpandableCard will be shown when `isCardActive` is true */}
<ExpandableCard
  isActive={isActiveUser}
  onClose={() => setActiveUser(false)} // Close the card
  content={<UsernameInput />}
/>

  {/* Add Asset Button */}
  <Button className="font-code font-semibold text-lg" onClick={handleClick1}>
  <div className="flex flex-row justify-center items-center gap-2">
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-database"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12.75m-4 0a4 1.75 0 1 0 8 0a4 1.75 0 1 0 -8 0" /><path d="M8 12.5v3.75c0 .966 1.79 1.75 4 1.75s4 -.784 4 -1.75v-3.75" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
  Add Asset
  </div>
  </Button>
  <ExpandableCard
  isActive={isCardActive}
  onClose={() => setIsCardActive(false)} // Close the card
  content={<AestheticForm />}
/>
</div>

        <div className="flex gap-2 flex-1">
          {[...new Array(1)].map((i) => (
            <div
              key={"second" + i}
              className="h-full w-full mt-2 rounded-xl bg-slate-900 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
