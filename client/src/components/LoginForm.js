import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/Auth';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div>
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                type='text' 
                placeholder='Username'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password' 
                placeholder='Password'
            />
            <button onClick={e => axios.post('http://localhost:6000/auth/login', {username, password}).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })}>Sign in</button>
            <button>Sign up</button>
        </div>
    );
}

export default LoginForm;