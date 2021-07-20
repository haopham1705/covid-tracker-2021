import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    isLoading: false,
}

const globalSlice = createSlice({
    name: "globalSlice",
    initialState: initialState,
    reducers: {
        showLoading(state, action) {
            state.isLoading = !state.isLoading
        }, 
        logOut(state, action) {
            return initialState
        }
    }
})

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };