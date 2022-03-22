import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { fetchBooks } from "./util/search_util"

import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { followList } from "./util/user_api_util"
import { popularScore } from "./util/book_api_util"
import { removeBookFromList } from "./util/book_api_util"
import { seeds } from "./util/seed_apil_util"

document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
        store = configureStore(preloadedState);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            // to be update once we have the modol
            window.location.href = '/login';
        }
    } else {
        store = configureStore({});
    }

    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});

window.axios = axios
window.searchbar = fetchBooks
window.followList = followList
window.popularScore = popularScore
window.removeBookFromList = removeBookFromList
window.seedUsers = seeds