"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaFolder, FaSpinner, FaCloud } from "react-icons/fa"; // Tambahkan FaCloud

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobileSidebar: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  isMobileSidebar,
}: SidebarProps) {
  const { items: menuData, loading } = useSelector((state: RootState) => state.menu);

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuToggle = (id: string) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <div
      className={`fixed left-0 w-64 h-screen bg-[#18181B] text-gray-300 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {/* Tambahkan ikon FaCloud di sebelah tulisan CLOIT */}
          <div className="flex items-center">
            <FaCloud className="text-white mr-2" size={20} /> {/* Ikon awan */}
            <span className="text-xl font-bold text-white">CLOIT</span>
          </div>
          {isMobileSidebar ? (
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ≡
            </button>
          ) : (
            <button className="text-gray-400 hover:text-white">
              
            </button>
          )}
        </div>

        <nav>
          {loading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-white" size={24} />
            </div>
          ) : (
            menuData.map((item) => (
              <div key={item.id}>
                {/* Parent Menu */}
                <div
                  className={`flex items-center px-4 py-2 mb-1 rounded-lg cursor-pointer ${
                    item.active
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => item.children && handleSubMenuToggle(item.id)}
                >
                  {item.icon ? (
                    <span className="mr-3">{item.icon}</span>
                  ) : (
                    <FaFolder className="mr-3" />
                  )}
                  <span>{item.name}</span>
                </div>

                {/* Sub-menu */}
                {item.children && openSubMenu === item.id && (
                  <div className="pl-6">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={`${subItem.name}`}
                        className={`flex items-center px-4 py-2 mb-1 rounded-lg ${
                          subItem.active
                            ? "bg-gray-700 text-white"
                            : "hover:bg-gray-600"
                        }`}
                      >
                        {subItem.icon ? (
                          <span className="mr-3">{subItem.icon}</span>
                        ) : (
                          <FaFolder className="mr-3" />
                        )}
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </nav>
      </div>
    </div>
  );
}
