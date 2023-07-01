import React, { useState } from 'react';
import { useContext } from 'react';
import { CredentialsContext } from '../App';
import { useEffect } from 'react';

const Login = (props) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [, setCredentials] = useContext(CredentialsContext);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.type === 'text') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    const loggedInPassword = localStorage.getItem("password");
    if (loggedInUser) {
      setCredentials({
        username: loggedInUser,
        password: loggedInPassword,
      });
      props.setIsAuthenticated(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then((res) => {
        setCredentials({
          username: username,
          password: password,
        });
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        console.log(username, password);
        props.setIsAuthenticated(true);
        alert('User Logged In Successfully');
      })
      .catch((err) => {
        console.log(err);
        alert('Invalid Credentials');
      });
  };

  return (
    <div className="login bg-gray-900">
      <div className="flex items-center justify-center min-h-screen">
        <div className="items-center justify-center bg-gray-700 p-9 rounded-3xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-[#08D9D6]">Login</h1>
            <div className="flex flex-col space-y-4 mt-8">
              <input
                type="text"
                placeholder="Username"
                className="px-4 py-2 border-white outline-gray-800 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                value={username}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 border-white outline-gray-800 bg-whitte rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                value={password}
                onChange={handleChange}
              />
              <button
                className="px-4 py-2 bg-[#08D9D6] hover:bg-[#FF2E63] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="text-white">
                New User? <a href="/register" className="text-blue-600">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
