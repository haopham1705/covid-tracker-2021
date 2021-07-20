import React from 'react'
import Header from 'components/Header';
import Trackers from 'components/Trackers'
import News from 'components/News'
import NotFound from 'components/NotFound'
import { Route, Switch, useRouteMatch } from "react-router";
import { Link, NavLink } from 'react-router-dom';
import { Container } from '@material-ui/core'



export default function HomePage() {
    const match = useRouteMatch(); //nested routing

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const checkLogin = () => username === 'admin' && password === 'admin';

    return (
        <>
            <Header isLoggedIn={checkLogin} />
            <Container>
                {/* <News /> */}
                <Switch>
                    <Route path={match.path} component={News} exact />
                    <Route path={match.path} component={Trackers} exact />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </>
    )
}
