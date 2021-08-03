import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { GlobalActions } from '../../redux/slices/globalSlice'
import './NotFound.scss'


export default function NotFound() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        setTimeout(() => {
            dispatch(GlobalActions.showLoading())
        }, 1200)
    }, [])

    return (
        <div className="container not-found-content">
            <h1>{t('content.not_found')}</h1>
            <br />
            <Button href="/" color="primary" href="/">
                Back to Home
            </Button>
        </div>
    )
}