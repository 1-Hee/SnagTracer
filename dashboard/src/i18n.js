// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "home": "Home",
          "myWorkspace": "My Workspace",
          "createWorkspace": "Create Workspace",
          "addIssue": "Add Issue",
          "myBookmark": "My Bookmark",
          "manageAttachment": "Attachment",
          "myProfile": "My Profile",
          "manageUser": "Manage User"
        },
      },
      ko: {
        translation: {
          "home": "홈",
          "myWorkspace": "나의 작업실",
          "createWorkspace": "작업실 생성하기",
          "addIssue": "이슈 등록 하기",
          "myBookmark": "즐겨찾기",
          "manageAttachment": "첨부 파일 관리",
          "myProfile": "나의 정보",
          "manageUser": "사용자 관리"
        },
      },
    },
    lng: "en", // 기본 언어 설정
    fallbackLng: "en", // 번역이 없을 경우 fallback 언어 설정
    interpolation: {
      escapeValue: false, // React에서 XSS 공격을 방지하기 위해
    },
  });

export default i18n;
