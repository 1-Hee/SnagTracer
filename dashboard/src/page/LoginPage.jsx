// libs
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import { login } from '../auth';

const LoginPage = () => {
    const { t } = useTranslation();  // useTranslation hook;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 실제론 서버로부터 받은 JWT를 저장해야 함    
        let fakeToken = `token=${id}:${password}`
        console.log(fakeToken)
        // const fakeToken = 'your.jwt.token.here';
        login(fakeToken);
        // onLoginSuccess(); // App 상태 갱신
        navigate('/home')
    };  

    // route to find user id
    const handleFindId = () => {
        navigate('/findId')
    }

    // route to find user password
    const handleFindPwd = () => {
        navigate('/')
    }

    // rout to register user
    const handleUserJoin = () => {
        navigate('/join')

    }

    // handle google auth login
    const hadleGoogleLogin = () => {
        alert('try to login via google auth!')        
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
        <div className="w-[400px] bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">{t('titleLogin')}</h2>
            <hr />
            <div>
            <label className="block text-sm font-medium mb-1">{t('txtUserId')}</label>
            <input
                type="text"
                placeholder={t('hintUserId')}
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">{t('txtUserPwd')}</label>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('hintUserPwd')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm"
            />
            <div className="mt-2">
                <label className="text-sm flex items-center space-x-1">
                <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                />
                <span>{t('txtShowPwd')}</span>
                </label>
            </div>
            </div>

            {/* 로그인 버튼 */}
            <button 
                className="w-full py-2 bg-blue-200 text-white font-semibold rounded hover:bg-blue-300 transition"
                onClick={(e)=>{
                    handleLogin();
                }}
                >
            {t('txtUserLogin')}
            </button>

            {/* 하단 링크 */}
            <div className="flex justify-between text-sm text-blue-400">
            <button className="hover:underline">{t('txtFindUserId')}</button>
            <button className="hover:underline">{t('txtFindUserPwd')}</button>
            </div>
            <div className="text-center text-sm text-gray-400">{t('txtOr')}</div>
            <button className="w-full py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                {t('txtLoginGoogle')}
            </button>
            <div className="text-center text-sm">
                {t('hintUserJoin')}
            <div>
                <button className="mt-2 px-4 py-1 bg-blue-200 text-white rounded hover:bg-blue-300 transition text-sm">
                {t('txtUserJoin')}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;