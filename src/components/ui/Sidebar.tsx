"use client";
import React from "react";
import Link from "next/link";
import { sidebarMenuItems } from "@/lib/constants/menuItems";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobileSidebar: boolean; // Tambahkan properti ini
}

export default function Sidebar({
  isOpen,
  onClose,
  isMobileSidebar,
}: SidebarProps) {
  return (
    <div
      className={`fixed left-0 w-64 h-screen bg-[#18181B] text-gray-300 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-white">CLOIT</span>
          {isMobileSidebar && ( // Tombol hanya muncul jika isMobileSidebar adalah true
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ≡
            </button>
          )}
        </div>

        <nav>
          {sidebarMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`
                flex items-center px-4 py-2 mb-1 rounded-lg
                ${item.highlight ? "bg-[#4ADE80] text-black" : "hover:bg-gray-800"}
                ${item.active ? "bg-gray-800" : ""}
              `}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
