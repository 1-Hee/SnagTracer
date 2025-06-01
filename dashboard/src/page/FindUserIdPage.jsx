// libs
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

// assets

// compoents

const FindUserIdPage = () => {
  const { t } = useTranslation();  // useTranslation hook;
  const [email, setEmail] = useState('');

  const handleFindId = () => {
    // TODO: API 호출 구현
    alert(`아이디 찾기 요청: ${email}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('titleFindId')}</h2>
      <p className="text-sm text-gray-500 mb-4">{t('hintFindId')}</p>
      <input
        type="email"
        placeholder={t('hintInputEmail')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleFindId}
        className="w-full bg-blue-200 hover:bg-blue-300 text-white py-2 rounded"
      >
        {t('txtSendEmail')}
      </button>
    </div>
  );
};

export default FindUserIdPage