import axios from "axios";
import { postNoCatch, saveToken } from "../../http";

// export const login = (username, password) => (dispatch => {
//     dispatch(startRequest);
//     console.log('start');
//     return postNoCatch('/auth/login', {username, password})
//         .then(response => {
//             const {token} = response.data;
//             dispatch(saveToken(token));
//             dispatch(successRequest);
//         }).catch(error => console.error(error))
// });

export const login = (username, password) => (dispatch => {
    axios.post('http://localhost:6000/auth/login', {username, password})
        .then(response => {
            const {token} = response.data;
            dispatch(saveToken(token));
        }).catch(error => console.error(error))
})

const startRequest = () => ({type: 'START_LOAD_ACTION', payload: {}});
const successRequest = () => ({type: 'SUCCESS_LOAD_ACTION', payload: {}});