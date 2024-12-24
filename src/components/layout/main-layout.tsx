"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../ui/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarMobile, setIsSidebarMobile] = useState(false);

  // Detect if the device is mobile and set the state
  useEffect(() => {
    const checkIsMobile = () => setIsSidebarMobile(window.innerWidth < 1024);

    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Automatically hide the sidebar if on mobile
  useEffect(() => {
    if (isSidebarMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isSidebarMobile]);

  // Prepare the dynamic class for Sidebar
  const sidebarClassName = `fixed left-0 top-0 h-screen bg-[#18181B] text-gray-300 transition-transform duration-300 ease-in-out ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 lg:relative lg:block lg:w-64`;

  return (
    <div className="min-h-screen bg-gray-100 grid lg:grid-cols-[auto]">
      {/* Provider wrapping the entire layout */}
      <Provider store={store}>
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isMobileSidebar={isSidebarMobile}
        />

        {/* Main Content */}
        <main
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          <div className="p-4">
            {/* Toggle Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mb-4 p-2 hover:bg-gray-200 rounded-lg lg:hidden"
            >
              ≡
            </button>
            {children}
          </div>
        </main>
      </Provider>
    </div>
  );
}
