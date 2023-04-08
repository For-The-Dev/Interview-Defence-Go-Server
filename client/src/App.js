import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setToken(token);
      setIsLogin(true);
    }
  }, []);
  return (
    <div className='main'>
      <div className='container'>
        <Routes>
          <Route path='/' element={isLogin ? <Mypage setIsLogin={setIsLogin} token={token} /> : <Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
