"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronRight, Edit, Plus, Trash } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMenuItems, fetchMenuContent } from "@/redux/menuSlice";
import axios from "axios";

export default function MenuSystem({ isMobile = true }) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: menuData, selectedMenuContent, loading } = useSelector((state: RootState) => state.menu);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["system-management"]));
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    parentId: "",
    parentName: "",
    depth: "auto",
    name: "",
  });
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  useEffect(() => {
    // Ambil konten menu jika `selectedMenu` dipilih
    if (selectedMenu) {
      dispatch(fetchMenuContent(selectedMenu));
    } else {
      dispatch(fetchMenuContent("")); // Ambil semua menu
    }
  }, [selectedMenu, dispatch]);

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

  const handleExpandAll = () => {
    const itemsToExpand = selectedMenu ? selectedMenuContent : menuData;
    setExpandedItems(new Set(getAllItemIds(itemsToExpand)));
  };
  
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = level * 20;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center py-2 cursor-pointer hover:bg-gray-100 ${level === 0 ? "font-medium" : ""}`}
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

          <button
            className="ml-2 p-1 text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              handleAddClick(item);
            }}
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            className="ml-2 p-1 text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(item);
            }}
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            className="ml-2 p-1 text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(item);
            }}
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
        {isExpanded && hasChildren && (
          <div className="ml-2">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleAddClick = (item: MenuItem) => {
    setFormMode('add');
    setFormData({
      id: "",
      parentId: item.id,
      parentName: item.name,
      depth: `${(item.depth ?? 0) + 1}`,
      name: "",
    });
  };

  const handleEditClick = (item: MenuItem) => {
    setFormMode('edit');
    setFormData({
      id: item.id,
      parentId: item.parentId || "",
      parentName: item.parentName || "",
      depth: (item.depth ?? 0).toString(),
      name: item.name,
    });
  };

  const handleDeleteClick = async (item: MenuItem) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${item.name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.API_URL}/menus/${item.id}`);
        dispatch(fetchMenuItems());
        if (selectedMenu) {
          dispatch(fetchMenuContent(selectedMenu));
        }
      } catch (error) {
        console.error("Error deleting menu item:", error);
        alert("Failed to delete menu item");
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Name is required!");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        parentId: formData.parentId || null,
      };

      if (formMode === 'edit') {
        await axios.patch(`${process.env.API_URL}/menus/${formData.id}`, payload);
      } else {
        await axios.post(`${process.env.API_URL}/menus`, payload);
      }

      setFormData({
        id: "",
        parentId: "",
        parentName: "",
        depth: "auto",
        name: "",
      });
      setFormMode('add');

      dispatch(fetchMenuItems());
      if (selectedMenu) {
        dispatch(fetchMenuContent(selectedMenu));
      }
    } catch (error) {
      console.error("Failed to save menu item:", error);
      alert("Failed to save menu item");
    }
  };

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
    dispatch(fetchMenuContent(menuId));
  };

  return (
    <div className="bg-white p-4 md:grid md:grid-cols-2">
      <div className="md:mr-32">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">📑</span>
          </div>
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>

        <div className="mb-4">
          <select
            className="border rounded px-3 py-1.5 w-full"
            value={selectedMenu || ""}
            onChange={(e) => handleMenuSelect(e.target.value)}
          >
            <option value="" disabled>Select Menu</option>
            {menuData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-start items-center mb-4">
          <button
            onClick={handleExpandAll}
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

        {/* Display loading spinner when loading */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mb-6">
            {(selectedMenu ? selectedMenuContent : menuData).map((item) =>
              renderMenuItem(item)
            )}
          </div>
        )}
      </div>

      <div className="md:mr-10">
        <div className="space-y-4">
          <div className="text-lg font-semibold">
            {formMode === 'add' ? "Add Menu Item" : "Edit Menu Item"}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parent ID</label>
            <div className="bg-gray-50 p-2 rounded text-sm min-h-[38px]">
              {formData.parentId || "-"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Depth</label>
            <input
              type="text"
              value={formData.depth}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parent Name</label>
            <div className="bg-gray-50 p-2 rounded text-sm min-h-[38px]">
              {formData.parentName || "-"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full px-3 py-2 text-white bg-blue-600 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
