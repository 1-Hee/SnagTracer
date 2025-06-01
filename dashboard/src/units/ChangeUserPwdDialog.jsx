// 📁 components/user/ChangeUserPwdDialog.jsx
import React, { useState } from 'react';

const ChangeUserPwdDialog = ({userId}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: 비밀번호 변경 API 호출
    alert('비밀번호 변경 요청');
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
      <p className="text-sm text-gray-500 mb-4">
        새 비밀번호를 입력해 주세요. <br />문자, 숫자, 특수문자를 포함하여 10자 이상
      </p>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="새 비밀번호를 입력해주세요."
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
          비밀번호 보기
        </label>
      </div>
      <input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleChangePassword}
        className="w-full bg-blue-200 hover:bg-blue-300 text-white py-2 rounded"
      >
        비밀번호 변경
      </button>
    </div>
  );
};

export default ChangeUserPwdDialog;
