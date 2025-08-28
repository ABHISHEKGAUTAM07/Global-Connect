import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

// ✅ Fetch all posts
export const fetchPosts = createAsyncThunk('post/fetchPosts', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API}/posts/feed`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
