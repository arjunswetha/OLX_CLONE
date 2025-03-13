import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;


    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid.');
      isValid = false;
    }

   
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="#" onClick={handleSignupClick}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
