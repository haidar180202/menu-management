"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { MenuItem } from "@/types/menu";

interface MenuSystemProps {
  isMobile?: boolean;
}

export default function MenuSystem({ isMobile = true }: MenuSystemProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["system-management"])
  );

  const menuData: MenuItem[] = [
    {
      id: "system-management",
      name: "system management",
      children: [
        {
          id: "system-management-sub",
          name: "System Management",
          children: [
            {
              id: "systems",
              name: "Systems",
              children: [
                {
                  id: "system-code",
                  name: "System Code",
                  children: [
                    { id: "code-registration", name: "Code Registration" },
                    { id: "code-registration-2", name: "Code Registration - 2" },
                  ],
                },
                { id: "properties", name: "Properties" },
              ],
            },
            {
              id: "menus",
              name: "Menus",
              children: [
                { id: "menu-registration", name: "Menu Registration" },
              ],
            },
            {
              id: "api-list",
              name: "API List",
              children: [
                { id: "api-registration", name: "API Registration" },
                { id: "api-test", name: "API Test" },
              ],
            },
            {
              id: "users-groups",
              name: "Users & Groups",
              children: [
                {
                  id: "users",
                  name: "Users",
                  children: [
                    { id: "user-account-registration", name: "User Account Registration" },
                  ],
                },
                {
                  id: "groups",
                  name: "Groups",
                  children: [
                    { id: "user-group-registration", name: "User Group Registration" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const getAllItemIds = (items: MenuItem[]): string[] => {
    let ids: string[] = [];
    items.forEach((item) => {
      ids.push(item.id);
      if (item.children) {
        ids = [...ids, ...getAllItemIds(item.children)];
      }
    });
    return ids;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = level * 20;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center py-2 cursor-pointer hover:bg-gray-100 ${level === 0 ? "font-medium" : ""
            }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              const newExpanded = new Set(expandedItems);
              if (expandedItems.has(item.id)) {
                newExpanded.delete(item.id);
              } else {
                newExpanded.add(item.id);
              }
              setExpandedItems(newExpanded);
            }
          }}
        >
          {hasChildren && (
            <span className="mr-1">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          <span className="text-sm">{item.name}</span>
        </div>
        {isExpanded && hasChildren && (
          <div className="ml-2">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 md:grid md:grid-cols-2">
      <div className="md:mr-32">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">≡</span>
          </div>
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>

        {/* Menu */}
        <div className="mb-4">
          <select className="border rounded px-3 py-1.5 w-full">
            <option>system management</option>
          </select>
        </div>

        {/* Expand/Collapse */}
        <div className="flex justify-start items-center mb-4">
          <button
            onClick={() => setExpandedItems(new Set(getAllItemIds(menuData)))}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded mr-2"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedItems(new Set())}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded mr-2"
          >
            Collapse All
          </button>
        </div>

        {/* Menu Items */}
        <div className="border rounded-lg mb-6">
          {menuData.map((item) => renderMenuItem(item))}
        </div>
      </div>

      <div className="md:mr-10">
        {/* Detail Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Menu ID</label>
            <div className="bg-gray-50 p-2 rounded text-sm">
              5632Deef-6af6-11ed-a7ba-f220b6e5e4a9
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Depth</label>
            <input
              type="text"
              value="3"
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parent Data</label>
            <input
              type="text"
              value="Systems"
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value="System Code"
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
