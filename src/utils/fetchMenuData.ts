import { MenuItem } from "@/types/menu";
import axios from "axios";


const fetchMenuData = async (): Promise<MenuItem[]> => {
  try {
    const response = await axios.get('/api/menus'); // Ganti dengan URL API Anda
    return response.data; // Pastikan format data sesuai dengan tipe MenuItem
  } catch (error) {
    console.error('Failed to fetch menu data:', error);
    return [];
  }
};

export {fetchMenuData}