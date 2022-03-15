import React from 'react';
// import { Link } from 'react-router-dom'
// import './top_nav.css'
import TopNavAuth from "./top_nav_auth";
import TopNavMain from "./top_nav_main";

export default ({ loggedIn, logout }) => {
    const display = loggedIn ? (
        <TopNavMain logout={logout} />
    ) : (
        <TopNavAuth />
    );

    return (
        <header>
            <div>{display}</div>
        </header>
    );
};
