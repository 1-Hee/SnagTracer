// libs
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth'

// assets

// components

const ChangeUserPwdDialog = ({userId}) => {
  const { t } = useTranslation();  // useTranslation hook;
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else if((!password) || (!confirmPassword)) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    // TODO: 비밀번호 변경 API 호출
    alert('비밀번호 변경 요청');
    logout();
    navigate('/'); // 루트로 이동하게!
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">{t('titleChangePwd')}</h2>
      <p className="text-sm text-gray-500 mb-4">
       {t('hintPwdChange')}<br />{t('hintPwdRule')}
      </p>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={t('hintInputNewPwd')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <div className="text-sm text-right mb-4">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-1"
          />
          {t('txtShowPwd')}
        </label>
      </div>
      <input
        type="password"
        placeholder={t('txtPwdRepeat')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleChangePassword}
        className="w-full bg-blue-200 hover:bg-blue-300 text-white py-2 rounded"
      >
        {t('txtChangePassword')}
      </button>
    </div>
  );
};

export default ChangeUserPwdDialog;
