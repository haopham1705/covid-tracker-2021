import React from 'react'
import Header from 'components/Header';
import Trackers from 'features/Trackers'
import News from 'pages/News'
import NotFound from 'components/NotFound'
import { Route, Switch, useRouteMatch } from "react-router";
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core'



export default function HomePage() {
    //nested routing
    const match = useRouteMatch(); 

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const checkLogin = () => username === 'admin' && password === 'admin';

    return (
        <>
            <Header isLoggedIn={checkLogin} >
                <Container>
                    <Switch>
                        <Redirect from="/" to="/home" exact />

                        <Route path='/news' component={News} exact />
                        <Route path='/trackers' component={Trackers} exact />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </Header>
            

        </>
    )
}
