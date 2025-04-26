import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/ic_user.png"; // 기본 프로필 이미지 불러오기

function ProfileIcon() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/myProfile"); // 프로필 수정 페이지로 이동
  };

  return (
    <button 
        onClick={handleProfileClick} 
        className="w-5 h-5 rounded-full overflow-hidden 
        border-2 border-black cursor-pointer">
      <img 
        src={defaultProfile} 
        alt="Profile" 
        className="w-full h-full object-cover" 
      />
    </button>
  );
}

export default ProfileIcon;
