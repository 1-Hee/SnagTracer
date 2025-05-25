// libs
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isAuthenticated, logout } from './auth';

// assets

// components
import LoginDialog from './units/LoginDialog';
import MainLayout from './page/MainLayout';

import RegisterDialog from './units/RegisterDialog';
import FindUserIdDialog from './units/FindUserIdDialog';
import FindUserPwdDialog from './units/FindUserPwdDialog';
import ChangeUserPwdDialog from './units/ChangeUserPwdDialog'

function App() {
  const [auth, setAuth] = useState(false);

  return (
    // <>
    //   {auth ? (
    //     <MainLayout />
    //   ) : (
    //     <LoginDialog onLoginSuccess={() => setAuth(true)} />
    //   )}
    // </>
    <Routes>
      <Route path="/login" element={<LoginDialog/>} />
      <Route path="/home" element={<MainLayout/>} />
      <Route path='/join' element={<RegisterDialog/>} />
      <Route path='/findId' element={<FindUserIdDialog/>} />
      <Route path='/changePwd' element={<ChangeUserPwdDialog/>} />
  </Routes>    


  );
}

export default App;
