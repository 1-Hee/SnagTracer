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
          "manageUser": "Manage User",
          "titleHomePage": "My Dashboard",
          "userName" : "User Name",
          "department": "Department",
          "position" : "Position",
          "lastLogin": "Last Login",
          "titleDashWorkpsace" : "Active Workspace",
          "titleMyIssue": "My Issues",
          "titleIssueRatio": "Issue Resolution Rate",
          "txtTotalIssue": "Total Issues",
          "txtResolvedIssue": "Resolved Issues",
          "txtResolutionRate" : "Resolution Rate",
          "txtItems": " items",
          "txtIssue" : "issue",
          "txtMember" : "member",
          "txtPeople": "people",
          "txtAnd" : "and",
          "txtOther" : "others",
          "txtWorkSpace": "workspace",
          "prefixEndScroll": "No more",
          "suffixEndScroll": " available",
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
          "manageUser": "사용자 관리",
          "titleHomePage": "나의 대시 보드",
          "userName" : "사용자 이름",
          "department": "부 서",
          "position" : "직  위",
          "lastLogin": "마지막 로그인",
          "titleDashWorkpsace" : "참여중인 작업실",
          "titleMyIssue": "나의 이슈",
          "titleIssueRatio": "이슈 해결률",
          "txtTotalIssue": "전체 이슈",
          "txtResolvedIssue": "해결된 이슈",
          "txtResolutionRate" : "해결률",
          "txtItems": "개",
          "txtIssue" : "이슈",
          "txtMember" : "참여자",
          "txtPeople": "명",
          "txtAnd" : "외",
          "txtOther" : "명",
          "txtWorkSpace": "작업실",
          "prefixEndScroll": "더 이상 불러올",
          "suffixEndScroll": "(이)가 없습니다.",

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
