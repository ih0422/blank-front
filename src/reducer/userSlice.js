import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        role: "",
        token: null,
        login: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.role = action.payload.role
            state.token = action.payload.token
            state.login = true
        },
        
        clearUser: (state) => {
            state.name = ""
            state.email = ""
            state.role = ""
            state.token = ""
            state.login = false
        },
    },
})

export const { loginUser, clearUser } = userSlice.actions
export default userSlice.reducer