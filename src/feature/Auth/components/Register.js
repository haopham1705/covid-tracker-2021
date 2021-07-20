import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import RegisterForm from './RegisterForm'
import { register } from 'redux/slices/userSlice'

export default function Register() {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const handleRegisterSubmit = async (formValues) => {
        try {
            const resultFormValues = {
                fullName: `${formValues.firstName} ${formValues.lastName}`,
                username: formValues.email,
                ...formValues
            }

            delete resultFormValues.firstName
            delete resultFormValues.lastName
            delete resultFormValues.retypePassword

            const action = register(resultFormValues)
            const resultAction = await dispatch(action)
            unwrapResult(resultAction)

            enqueueSnackbar('Register Successfully...', { variant: 'success' })
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }

    return <RegisterForm onSubmit={handleRegisterSubmit} />
}
