// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch user by username
export const fetchUserByUsername = createAsyncThunk(
    'user/fetchByUsername',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://dummyjson.com/users/filter?key=username&value=${username}`);
            const user = response.data.users[0];

            if (!user) {
                return rejectWithValue('User not found.');
            }

            const fullProfile = await axios.get(`https://dummyjson.com/users/${user.id}`);
            return fullProfile.data;
        } catch (err) {
            return rejectWithValue('An error occurred during login.');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByUsername.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserByUsername.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserByUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
