// 📁 components/user/FindUserPwdDialog.jsx
import React, { useState, useEffect } from 'react';

const FindUserPwdDialog = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);

  const handleSendCode = () => {
    // TODO: API 호출 구현
    alert(`인증코드 발송: ${email}`);
    setTimeLeft(180);
  };

  const handleVerify = () => {
    // TODO: 인증코드 확인 구현
    alert(`입력한 코드: ${code}`);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">비밀번호 찾기</h2>
      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleSendCode} className="bg-blue-100 px-4 py-2 rounded">
          코드 발송
        </button>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="인증코드"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleVerify} className="bg-blue-100 px-4 py-2 rounded">
          확인
        </button>
      </div>
      <p className="text-xs text-purple-600 mb-4">남은시간: {formatTime(timeLeft)}</p>
      <button
        className="w-full bg-blue-200 hover:bg-blue-300 text-white py-2 rounded"
      >
        비밀번호 찾기
      </button>
    </div>
  );
};

export default FindUserPwdDialog;
