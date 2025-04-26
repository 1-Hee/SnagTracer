import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// assets
import iconGlobe from "../assets/ic_globe.svg"

function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "ko", label: "한국어" }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // 바꾼 후 드롭다운 닫기
  };

  return (
    <div className="relative">
        <div 
        onClick={toggleDropdown}
        className="cursor-pointer p-2 hover:bg-pale-blue300 transition-all duration-300 rounded w-fit"
        >
        <img src={iconGlobe} alt="icon" className="w-4 h-4" />
        </div>
      {isOpen && (
        <ul className="absolute mt-2 bg-white text-black shadow-md rounded w-32">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="p-2 hover:bg-pale-blue100 cursor-pointer"
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageDropdown;
