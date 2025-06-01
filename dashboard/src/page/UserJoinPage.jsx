// libs
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

// assets

// compoents

const UserJoinPage = () => {
  const { t } = useTranslation();  // useTranslation hook;
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    let interval;
    if (codeSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [codeSent, timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCode = () => {
    // 코드 전송 로직
    setCodeSent(true);
    setTimer(180);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 및 회원가입 처리 로직
    console.log(form);
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-center text-xl font-bold">{t('txtUserJoin')}</h2>
        <input
          type="text"
          name="username"
          placeholder={t('hintUserId')}
          value={form.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder={t('hintUserName')}
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder={t('hintInputEmail')}
            value={form.email}
            onChange={handleChange}
            className="flex-grow border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            onClick={handleSendCode}
            className="bg-sky-200 hover:bg-sky-300 px-3 py-2 rounded text-sm"
          >
            {t('txtSendCode')}
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="code"
            placeholder={t('txtAuthCode')}
            value={form.code}
            onChange={handleChange}
            className="flex-grow border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            className="bg-blue-200 hover:bg-blue-300 px-3 py-2 rounded text-sm"
          >
            {t('txtAuth')}
          </button>
        </div>

        {codeSent && (
          <p className="text-right text-xs text-purple-700 font-semibold">
            {t('txtTimeRemain')}: {formatTime(timer)}
          </p>
        )}

        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={t('hintUserPwd')}
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div className="flex justify-end text-sm text-gray-500 cursor-pointer mb-1"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {t('txtShowPwd')}
        </div>

        <input
          type="password"
          name="confirmPassword"
          placeholder={t('hintUserPwd')}
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-sky-300 hover:bg-sky-400 text-white py-2 rounded font-semibold"
        >
          {t('txtUserJoin')}
        </button>
      </form>
    </div>
  );
}

export default UserJoinPage;
