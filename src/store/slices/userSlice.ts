import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    users: []
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
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

const userReducer = userSlice.reducer
export default userReducer
