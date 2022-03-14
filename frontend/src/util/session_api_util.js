import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// to be updated once I have the modol for userauth on browser
export const signup = (userData) => {
    return axios.post('/api/users/signup', userData);
};

// to be updated once I have the modol for userauth on browser
export const login = (userData) => {
    return axios.post('/api/users/login', userData);
};
