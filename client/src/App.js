import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={isLogin ? <Mypage setIsLogin={setIsLogin} /> : <Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
