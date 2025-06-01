// libs
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isAuthenticated, logout } from './auth';

// assets

// components
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';


import UserJoinPage from './page/UserJoinPage';
import FindUserIdPage from './page/FindUserIdPage';
import UserPwdPage from './page/UserPwdPage';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>
      <Route path="/home" element={<MainPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path='/account/join' element={<UserJoinPage/>} />
      <Route path='/account/find-id' element={<FindUserIdPage/>} />
      <Route path='/account/find-pwd' element={<UserPwdPage/>} />
  </Routes>    


  );
}

export default App;
