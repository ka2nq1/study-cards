import axios from "axios";

const API_URL = 'http://localhost:6000';

export const saveToken = (token) => {
    if (token) {
        window.localStorage.setItem('token', token);
    } else {
        window.localStorage.removeItem('token');
    }
}

export const getToken = () => (
    window.localStorage.getItem('token')
);

export const getNoCatch = (path, params = {}) => (
    axios.get(API_URL + path,
        {
            params: params,
            paramsSerializer: (params) => (JSON.stringify(params))
        }
    )
);

export const get = (path, params = {}) => (
    getNoCatch(path, params)
        .catch(errorHandler)
);

export const postNoCatch = (path, data = {}) => (
    axios.post(API_URL + path, data)
)

export const post = (path, data = {}) => (
    postNoCatch(path, data)
        .catch(errorHandler)
);

const errorHandler = (error) => {
    const {status} = error.response;
    if (status === 403) {
        console.log('Forbidden! You can not perform this operation!');
    }
    throw error;
}