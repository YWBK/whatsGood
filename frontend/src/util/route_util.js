import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact, currentUserId }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            // stay on the splash page if the user is authenticated
            <Redirect to={`/users/${currentUserId}`} />
        )
    )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

// Use the isAuthenitcated slice of state to determine whether a user is logged in

// const mapStateToProps = state => (
//     { loggedIn: state.session.isAuthenticated }
// );
const mapStateToProps = state => {
    // debugger
    return ({
        currentUserId: state.session.isAuthenticated ? state.session.user.id : null, 
        loggedIn: state.session.isAuthenticated
    });
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));