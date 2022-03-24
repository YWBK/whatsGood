import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { fetchUser } from "../actions/user_actions";


// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact, currentUserId, fetchUser }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            // stay on the splash page if the user is authenticated
            <Redirect to={`/users/${currentUserId}`} />
        )
    )} />
    // <Route path={path} exact={exact} render={(props) => {
    //     if (!loggedIn) {
    //         return <Component {...props} />
    //     } else {

    //         return fetchUser(currentUserId)
    //             .then(() => {
    //                 return <Redirect to={`/users/${currentUserId}`} />
    //             })
    //     }
    // }} />
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

const mDTP = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
})

export const AuthRoute = withRouter(connect(mapStateToProps, mDTP)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));