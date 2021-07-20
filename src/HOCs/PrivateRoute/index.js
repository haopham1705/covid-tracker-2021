import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { checkLoggedIn } from '../checkLoggedIn';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <div>
            <Route
                {...rest}
                render={(props) =>
                    checkLoggedIn() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{ pathname: '/signin', state: { from: props.location } }}
                        />
                    )
                }
            />
        </div>
    );
}

export default PrivateRoute;
