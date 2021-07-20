import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './NotFound.scss'
import { GlobalActions } from '../../redux/slices/globalSlice'
import { useDispatch } from 'react-redux'
import {Button} from '@material-ui/core'

export default function NotFound() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        setTimeout(() => {
            dispatch(GlobalActions.showLoading())
        }, 1200)
    }, [])

    return (
        <div className="container not-found-content">
            <h1>Page Not Found</h1>
            <p>We can't find the page you're looking.</p> 
            <br/>
            <Button href="/"color="primary" href="#contained-buttons">
                Back to Home
            </Button>
        </div>
    )
}