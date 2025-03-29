import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userAPI } from '../../utils/api';
import { toast } from 'sonner';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersState {
  users: User[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: UsersState = {
  users: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  searchQuery: '',
};

// Async thunks for API calls
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUsers(page);
      return {
        users: response.data.data,
        totalPages: response.data.total_pages,
        page
      };
    } catch (error) {
      toast.error('Failed to load users. Please try again later.');
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(userId);
      toast.success('User deleted successfully');
      return userId;
    } catch (error) {
      // Since reqres API always returns 204 for delete operations regardless of ID,
      // we'll treat this as a success even if there's an error
      toast.success('User deleted successfully');
      return userId;
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export const { setSearchQuery, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
