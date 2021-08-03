import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import userApi from 'api/userApi'
// import { TOKEN, USER } from 'constants/index'

// export const register = createAsyncThunk('user/register', async (payload) => {
//     // const data = await userApi.register(payload)

//     localStorage.setItem(TOKEN, data.jwt)
//     localStorage.setItem(USER, JSON.stringify(data.user))

//     return data.user
// })

// export const login = createAsyncThunk('user/login', async (payload) => {
//     const data = await userApi.login(payload)

//     localStorage.setItem(TOKEN, data.jwt)
//     localStorage.setItem(USER, JSON.stringify(data.user))

//     return data.user
// })
const initialState = {
    username: 'admin',
    password: 'admin',
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login(state) {
            localStorage.setItem('username', state.username)
            localStorage.setItem('password', state.password)
        },
        logout(state) {
            // localStorage.removeItem('username')
            // localStorage.removeItem('password')
            state.initialState = initialState;
        }
    },
})

const { actions, reducer } = userSlice

export const { logout } = actions

export default reducer
