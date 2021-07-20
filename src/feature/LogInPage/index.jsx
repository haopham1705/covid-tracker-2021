import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { GlobalActions } from '../../redux/slices/globalSlice';
import './LoginPage.scss';
// import LogoImg from 'asserts/img/livef-logo.png'

function LogInPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(GlobalActions.toggleLoading());
        setTimeout(() => {
            dispatch(GlobalActions.toggleLoading());
        }, 2000);
    }, []);

    const handleUsername = (inputUsername) => {
        setUsername(inputUsername.target.value);
    };

    const handlePassword = (inputPassword) => {
        setPassword(inputPassword.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (username !== '' && password !== '') {
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                history.push('/');
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setMsg("Please enter correct username or password")
            }
        }
    };
    return (
        <div className="login-form fadeInDown" onSubmit={handleLogin}>
            <div className="formContent">
                {/* <img className="formContent__icon" src={LogoImg} id="icon" alt="User Icon" /> */}
                <h1 className="login-form__title"> Sign In </h1>
                <form>
                    <input type="text" onChange={handleUsername} id="login" className="fadeIn second" name="login" placeholder="username" required />
                    <input type="password" onChange={handlePassword} id="password" className="fadeIn third" name="login" placeholder="password" required />
                    <button className="fadeIn fourth btn" onClick={handleLogin}>Log In</button>
                </form>
                <span className='errorMsg'>{msg}</span>
            </div>
        </div>
    );
}

export default LogInPage;