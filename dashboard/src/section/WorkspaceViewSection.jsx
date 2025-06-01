// libs
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

// assets

// components
import JoinMember from '../units/JoinMember';
import IssueItem from '../units/IssueItem'

const members = ["Ace", "Baylone", "Canny", "Doish", "Elice", "Frank"];
const issues = [
  {
    issueId: "4452123",
    title: "에러 보고서: 로그인 실패",
    reporter: "Ace",
    date: "2025-04-01",
    email: "test@test.com",
    description: "로그인 중 문제가 발생했습니다...",
    isRead: 'false'    
  },
  {
    issueId: "4452315",
    title: "문서 생성 요청",
    reporter: "Baylon",
    date: "2025-04-01",
    email: "test@test.com",
    description: "새로운 문서를 요청합니다...",
    isRead: 'false'    
  },
  {
    issueId: "6545215",
    title: "서비스 응답 지연",
    reporter: "Cate",
    date: "2025-04-01",
    email: "test@test.com",
    description: "고객사에서 응답 속도에 대한 문의...",
    isRead: 'false'    
  },
  {
    issueId: "5465678",
    title: "에러 보고서: 로그인 실패",
    reporter: "David",
    date: "2025-04-01",
    email: "test@test.com",
    description: "로그인 중 문제가 발생했습니다...",
    isRead: 'false'    
  },
  {
    issueId: "5465678",
    title: "에러 보고서: 로그인 실패",
    reporter: "David",
    date: "2025-04-01",
    email: "test@test.com",
    description: "로그인 중 문제가 발생했습니다...",
    isRead: 'false'    
  },
  {
    issueId: "5465678",
    title: "에러 보고서: 로그인 실패",
    reporter: "David",
    date: "2025-04-01",
    email: "test@test.com",
    description: "로그인 중 문제가 발생했습니다...",
    isRead: 'false'    
  },
];

const profileWorkspace = {
    projectName: "문서 생성 플랫폼",
    constructor: "Ace",
    createAt: "2025-04-01",
    domain: "com.example.myproject",    

}

const WorkspaceViewSection = () => {
    const [searchParams] = useSearchParams();
    const workspaceId = searchParams.get("workId");     // '1234'  
    const navigate = useNavigate();
    const { t } = useTranslation();  // useTranslation hook;

    useEffect(() => {
        // 단순 숫자 형태인지 체크 by 정규식
        const isValidId = /^\d+$/.test(workspaceId);
        if (!isValidId) {
          alert(t('txtWrongPath'));
          navigate('/') // todo 404
        }
      }, [workspaceId, navigate]);
    

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{t('titleViewWorkspace')}</h2>
            <div className="flex space-x-4">
            <Pencil className="w-4 h-4 cursor-pointer text-gray-500" />
            <Trash2 className="w-4 h-4 cursor-pointer text-red-500" />
            </div>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-2 text-sm text-gray-700 gap-y-4">
            <span className="font-medium">{t('txtPjtName')}</span>
            <span>{profileWorkspace.projectName}</span>
            <span className="font-medium">{t('txtConstructor')}</span>
            <JoinMember name={profileWorkspace.constructor} /> 
            <span className="font-medium">{t('txtCreateAt')}</span>
            <span>{profileWorkspace.createAt}</span>
            <span className="font-medium">{t('txtDomain')}</span>
            <span>{profileWorkspace.domain}</span>
        </div>

        {/* Team Members */}
        <div className="">
            <h3 className="text-sm font-medium text-gray-800 mb-4 mt-8">{t('txtTeamList')} 
              <span className="text-gray-500 mx-2">{members.length} {t('txtPeople')}</span></h3>
            <div className="flex flex-wrap gap-2">
            {members.map((name) => <JoinMember name={name} />)}
            </div>
        </div>

        {/* Issue List */}
        <div className="">
            <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">{t('txtIssueList')} <span className="text-gray-500">{issues.length} {t('txtCases')}</span></span>
            <div className="flex space-x-2">
                <select className="text-sm border rounded px-2 py-1">
                    {/* 이부분은 서버로부터 받아올 것... */}                    
                    <option>보통</option>
                    <option>높음</option>
                    <option>긴급</option>                
                </select>
                <input
                type="text"
                placeholder={t('hintSearchIssue')}
                className="text-sm border rounded px-2 py-1"
                />
            </div>
            </div>
            <div className="space-y-2 h-80 overflow-y-auto divide-y">
            {issues.map((issue, idx) => (<IssueItem key={idx} {...issue}/>))}
            </div>
        </div>
        </div>
    );
}

export default WorkspaceViewSection;
