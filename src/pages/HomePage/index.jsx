import { Container, makeStyles } from '@material-ui/core';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import TrackerByCountry from 'features/TrackerByCountry';
import TrackersGlobalMap from 'features/TrackersGlobalMap';
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
            <Header isLoggedIn={checkLogin} >
                <Container className={classes.root}>
                    <Switch>
                        <Redirect from="/home" to="/" exact />
                        <Route path='/' component={TrackerByCountry} exact/>
                        <Route path='/news' component={News} exact />
                        <Route path='/trackers' component={TrackersGlobalMap} exact />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </Header>
            

        </>
    )
}
