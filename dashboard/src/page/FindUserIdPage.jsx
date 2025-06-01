// 📁 components/user/FindUserIdDialog.jsx
import React, { useState } from 'react';

const FindUserIdPage = () => {
  const [email, setEmail] = useState('');

  const handleFindId = () => {
    // TODO: API 호출 구현
    alert(`아이디 찾기 요청: ${email}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">아이디 찾기</h2>
      <p className="text-sm text-gray-500 mb-4">가입 시 입력하신 이메일을 통해 아이디를 찾으실 수 있습니다.</p>
      <input
        type="email"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleFindId}
        className="w-full bg-blue-200 hover:bg-blue-300 text-white py-2 rounded"
      >
        아이디 찾기
      </button>
    </div>
  );
};

export default FindUserIdPage