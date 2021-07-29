// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import './GlobalLoading.scss';

export default function GlobalLoading() {
    const loading = useSelector(state => state.GlobalReducer.isLoading);

    if (loading) {
        return (
            <div className="loading-content">
                <div className="loading-content__bg-loading"></div> 
                {/* <CircularProgress className="loading-content__icon" /> */}
                <LinearProgress color="secondary" />
            </div>
        )
    }
    return null
}
