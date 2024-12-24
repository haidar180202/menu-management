import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MenuItem } from '../components/types/menu';

interface MenuState {
  items: MenuItem[];
  selectedMenuContent: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  selectedMenuContent: [],
  loading: false,
  error: null
};

// Read API URL from environment variable
const API_URL = process.env.API_URL || 'https://menu-management-backend-production.up.railway.app';

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async () => {
    const response = await axios.get(`${API_URL}/menus`);
    return response.data.data;
  }
);

export const fetchMenuContent = createAsyncThunk(
  'menu/fetchMenuContent',
  async (menuId: string | null) => {
    const response = await axios.get(`${API_URL}/menus/${menuId}`);
    return response.data.data;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearSelectedContent: (state) => {
      state.selectedMenuContent = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.filter((item: MenuItem) => item.depth === 1);
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menu items';
      })
      .addCase(fetchMenuContent.fulfilled, (state, action) => {
        state.selectedMenuContent = [action.payload];
        state.error = null;
      })
      .addCase(fetchMenuContent.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch menu content';
      });
  }
});

export const { clearSelectedContent } = menuSlice.actions;
export default menuSlice.reducer;
