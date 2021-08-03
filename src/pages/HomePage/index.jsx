import { Container, makeStyles } from '@material-ui/core';
import MainLayout from 'HOCs/MainLayout';
import NotFound from 'components/NotFound';
import TrackersGlobalMap from 'pages/TrackersGlobal';
import TrackerGlobal from 'components/GlobalMap';
import TrackerCountry from 'pages/TrackerCountry';
import News from 'pages/News';
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router";
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '3rem',
    },
}))
export default function HomePage() {
    //nested routing
    const match = useRouteMatch();

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const checkLogin = () => username === 'admin' && password === 'admin';
    const classes = useStyles()
    return (
        <>
            <MainLayout isLoggedIn={checkLogin} >
                <Container className={classes.root}>
                    <Switch>
                        <Redirect from="/home" to="/" exact />
                        <Route path='/' component={TrackersGlobalMap} exact />
                        <Route path='/news' component={News} exact />
                        <Route path='/trackers' component={TrackerCountry} exact />
                        {/* <Route path='/global' component={TrackerGlobal} exact /> */}
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </MainLayout>
        </>
    )
}
