// libs
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import IssueForm from "../units/IssueForm"

// email은 요청 필요
const emailList = [
    {
      id: 1,
      subject: "서비스 응답 지연",
      sender: "test@test.com",
      date: "2025-04-01",
      preview: "고객사에서 응답 속도에 대한 문의...",
    },
    {
      id: 2,
      subject: "에러 보고서 : 로그인 실패",
      sender: "test@test.com",
      date: "2025-04-01",
      preview: "로그인 중 문제가 발생했습니다...",
    },
];

const AddIssueSection = () => {    
    const { t } = useTranslation();  // useTranslation hook;
    
    return (
        <IssueForm title={t('txtAddIssue')} emailList={emailList} />
    )
}

export default AddIssueSection;