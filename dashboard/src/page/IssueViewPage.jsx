// libs
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Trash2, Pencil, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// assets

// components
import JoinMember from '../units/JoinMember';
import InfoRow from "../units/InfoRow"
import StatusBadge from "../units/StatusBadge"
import PDFViewModal from "../units/PDFViewModal"

// TODO 
// 2. PDF Viewer 다이얼로그 창 디자인 최적화

const testUrl = "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"

const IssueViewPage = () => {
    const { issueId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();  // useTranslation hook;    

    const [pdfUrl, setPdfUrl] = useState(testUrl); // 나중에 백엔드에서 생성하는 url과 연동하기
    const [showPdf, setShowPdf] = useState(false);

    // loaded issue info (dummy)
    const loadedIssueInfo = {
        title: "로그인 오류 해결 요청",
        publisher: "Ace",
        createAt: "2025-04-01",
        workspace: "문서 생성 플랫폼",
        importance: "매우 중요",
        iValue: 4, // 대충 약속해서 만들기?
        statusMsg: "진행중",
        sValue: 1,  // 여기도 대충 약속해서 만들기
        memberList : ["Ace", "Baylone", "Canny", "Doish", "Elice", "Frank"],
        issueContent: "사용자 로그인 시도 시 '401 Unauthorized' 오류가 빈번하게 발생함 \n특히 카카오 소셜 로그인 연동 후, 앱 배포 처리 시 재현되는 것으로 추정됨.\nOAuth 흐름 처리 및 프론트 CORS 설정 문제로 의심되며, 로그 및 네트워크 확인이 필요함.",
        pdfTitle: "[로그인 오류 관련] 보안 로그인 사용자 문의 내역",
        pdfUrl:"https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
    }
    
    // dummy team member
    const [memberList] = useState(["Ace", "Baylone", "Canny", "Doish", "Elice", "Frank"])

    useEffect(() => {
        // 단순 숫자 형태인지 체크 by 정규식 
        const isValidId = /^\d+$/.test(issueId);
        if (!isValidId) {
            alert(t('txtWrongPath'));
            navigate('/') // todo 404
        }
      }, [issueId, navigate]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{t('titleIssueView')}</h1>
            <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
        </div>

        <div className="space-y-4">
            {/* 이슈 정보 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm mb-10">
                <InfoRow label={t('txtIssueTitle')} value={loadedIssueInfo.title} />
                <InfoRow label={t('txtPublisher')} value={<JoinMember name={loadedIssueInfo.publisher} />} />
                <InfoRow label={t('txtCreateAt')} value={loadedIssueInfo.createAt} />
                <InfoRow label={t('txtWorkSpace')} value={loadedIssueInfo.workspace} />
                <InfoRow label={t('txtImportance')} value={<StatusBadge text={loadedIssueInfo.importance} color="red" />} />
                <InfoRow label={t('txtIssueStatus')} value={<StatusBadge text={loadedIssueInfo.statusMsg} color="green" />} />
            </div>

            {/* 참조 인원 */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">{t('txtTeamList')} 
                    <span 
                        className="text-gray-500 text-xs mx-2">
                            {memberList.length} {t('txtPeople')}
                    </span>
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                    {loadedIssueInfo.memberList.map((name) => (<JoinMember key={name} name={name} />))}
                </div>
            </div>

            {/* 이슈 내용 */}
            <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">{t('txtIssueContent')}</h3>
            <div className="mt-1 bg-gray-100 p-3 rounded-md text-sm text-gray-800 whitespace-pre-line">
                {loadedIssueInfo.issueContent}
            </div>
            </div>

            {/* 첨부된 이메일 */}
            <div className="text-sm">
            <h3 className="font-medium text-mono700 mb-4">{t('attachedEmail')}</h3>
            <a
                href="#"
                className="text-pale-blue300 underline text-sm mt-1 inline-block mb-8"
                onClick={() => setShowPdf(true)}
            >
                {loadedIssueInfo.pdfTitle}
            </a>
            </div>
        </div>
        {/* PDF Modal */}
        {showPdf && ( <PDFViewModal pdfUrl={loadedIssueInfo.pdfUrl} setShowPdf={setShowPdf} /> )}
        </div>
  );
}

export default IssueViewPage