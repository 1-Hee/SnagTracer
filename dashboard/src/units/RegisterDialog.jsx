import React, { useState, useEffect } from 'react';

const RegisterDialog = () => {
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
        <h2 className="text-center text-xl font-bold">회원 가입</h2>

        <input
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
          value={form.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          name="name"
          placeholder="이름을 입력해주세요"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={handleChange}
            className="flex-grow border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            onClick={handleSendCode}
            className="bg-sky-200 hover:bg-sky-300 px-3 py-2 rounded text-sm"
          >
            코드 발송
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="code"
            placeholder="인증코드"
            value={form.code}
            onChange={handleChange}
            className="flex-grow border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            className="bg-blue-200 hover:bg-blue-300 px-3 py-2 rounded text-sm"
          >
            확인
          </button>
        </div>

        {codeSent && (
          <p className="text-right text-xs text-purple-700 font-semibold">
            남은시간: {formatTime(timer)}
          </p>
        )}

        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div className="flex justify-end text-sm text-gray-500 cursor-pointer mb-1"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          비밀번호 보기
        </div>

        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 입력해주세요"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-sky-300 hover:bg-sky-400 text-white py-2 rounded font-semibold"
        >
          회원 가입
        </button>
      </form>
    </div>
  );
}

export default RegisterDialog;
