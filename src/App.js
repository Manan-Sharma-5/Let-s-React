import React from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Chat from './pages/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

export const CredentialsContext = React.createContext();

function App() {

  const credentialState = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <CredentialsContext.Provider value={credentialState}>
    <div className="App">
   <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated}/> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated}/> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/react/" element={isAuthenticated ? <Chat setIsAuthenticated={setIsAuthenticated}/> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
      </Routes>
    </Router>
    </div>
    </CredentialsContext.Provider>
  );
}

export default App;
