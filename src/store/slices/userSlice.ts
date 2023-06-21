import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    users: [],
    isLoading: false,
    isError: false
}
export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios(`https://reqres.in/api/users`)
        return response.data
    } catch (error) {
        rejectWithValue(error)
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload
        })
        builder.addCase(getUsers.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

const userReducer = userSlice.reducer
export default userReducer
