import { unwrapResult } from '@reduxjs/toolkit'
import { login } from 'redux/slices/userSlice'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './LoginForm'

export default function Login() {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const handleLoginSubmit = async (formValues) => {
        try {
            const action = login(formValues)
            const resultAction = await dispatch(action)
            unwrapResult(resultAction)

            enqueueSnackbar('Login Successfully...', { variant: 'success' })
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }

    return <LoginForm onSubmit={handleLoginSubmit} />
}
