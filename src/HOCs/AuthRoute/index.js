import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { checkLoggedIn } from '../checkLoggedIn';

function AuthRoute({ component: Component, ...rest }) {
    return (
        <div>
            <Route
                {...rest}
                render={(props) => {
                    return checkLoggedIn() === false ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{ pathname: '/overview', state: { from: props.location } }}
                        />
                    );
                }}
            />
        </div>
    );
}

export default AuthRoute;
