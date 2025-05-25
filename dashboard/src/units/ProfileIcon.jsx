import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/ic_user.png"; // 기본 프로필 이미지 불러오기

function ProfileIcon() {
  const navigate = useNavigate();
  const [profileImgSrc, setProfileImgSrc] = useState('https://picsum.photos/200');  

  const handleProfileClick = () => {
    navigate(`/home?menu=myProfile`); // 프로필 수정 페이지로 이동
  };

  return (
    <button 
        onClick={handleProfileClick} 
        className="w-5 h-5 rounded-full overflow-hidden 
        border-1 border-mono300 cursor-pointer">
      <img 
        src={profileImgSrc} 
        alt="Profile" 
        className="w-full h-full object-cover" 
      />
    </button>
  );
}

export default ProfileIcon;
