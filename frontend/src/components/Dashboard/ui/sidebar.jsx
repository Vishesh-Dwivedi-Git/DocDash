"use client";
import { cn } from "../../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useSidebarStore ,useShareStore } from "../../../Store"; // Import Zustand store
import Logout from "../../SignIn/Logout";




export const Sidebar = ({ children }) => {
  return (
    <>
      <DesktopSidebar>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({ className, children, ...props }) => {
  
  const { open, toggleOpen } = useSidebarStore(); // Zustand for sidebar state
  

  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-black dark:bg-neutral-800 relative text-white",
        open ? "w-[250px]" : "w-[60px]"
      )}
      animate={{ width: open ? 250 : 60 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Toggle Button */}
      <button
        className="absolute right-[-16px] top-4 bg-gray-700 p-1 rounded-full shadow-md text-white hover:bg-gray-600"
        onClick={toggleOpen}
      >
        {open ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
      </button>

      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, toggleOpen } = useSidebarStore();

  return (
    <div className="md:hidden">
      {/* Toggle Button on Navbar */}
      <button
        className="flex items-center bg-black dark:bg-neutral-800 p-4"
        onClick={() => !open && toggleOpen()}
      >
        <IconChevronRight className="text-white" />
      </button>

      {/* Sidebar Overlay & Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click outside to close */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleOpen}
            />

            {/* Sidebar Panel - Full Height */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "fixed top-0 left-0 h-screen w-64 bg-black dark:bg-neutral-800 p-6 z-50 flex flex-col text-white",
                className
              )}
            >
              {/* Close Button */}
              <button className="absolute right-4 top-4 text-white cursor-pointer" onClick={toggleOpen}>
                <IconChevronLeft />
              </button>

              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({ link, className, ...props }) => {
  const { open } = useSidebarStore();
  const { setShowShareBox } = useShareStore();
  

  return (
    <div
      className={cn(
        "flex items-center gap-2 py-2 px-3 text-neutral-200 hover:bg-gray-700 rounded transition-all",
        className
      )}
      {...props}
    >
      {link.icon}

      {/* ✅ Share Button */}
      {link.label === "Share" ? (
        <button onClick={() => setShowShareBox(true)}>
          <motion.span animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.2 }}>
            {link.label}
          </motion.span>
        </button>
      ) : link.label === "Logout" ? (
        <motion.span animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.2 }}>
           <Logout />
      </motion.span>
      ) : link.label === "Dashboard" ? (
        <Link to="/dashboard">
          <motion.span animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.2 }}>
            {link.label}
          </motion.span>
        </Link>
      ) : (
        <Link to={link.href}>
          <motion.span animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.2 }}>
            {link.label}
          </motion.span>
        </Link>
      )}
    </div>
  );
}; 