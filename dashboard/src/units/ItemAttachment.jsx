// libs
import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// assets

// components
import PDFViewModal from "./PDFViewModal";

const ItemAttachment = ({ issueId, title, workpace, date, downloadKey, attachmentId }) => {
  const { t } = useTranslation();  // useTranslation hook;
  const navigate = useNavigate();

  const [showPdf, setShowPdf] = useState(false); // 모달 상태값  

  const handleIssueClick = (isRoute) => {
    if(isRoute){
      navigate(`/issueDetail/${issueId}`);
    }
  };
  return (
    <div 
      className="relative border-b last:border-b-0 py-2 pr-16"
      onClick={(e)=>{
        handleIssueClick(true)
      }}
      >
        {/* Attachment Info */}
        <div>
            <div className="mb-1 font-normal text-gray-800">
            [{issueId}] {title}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>{workpace}</span>
            <span className="mx-2">|</span>
            <span>{date}</span>
            </div>
        </div>
        {/* 오른쪽 중앙 위치 버튼 */}
        <button
            type="button"
            className="z-10 absolute right-4 top-1/2 -translate-y-1/2 bg-pale-blue500 hover:bg-pale-blue600 text-white px-4 py-1 rounded shadow-sm transition-all"
            onClick={ (e)=>{ 
              e.stopPropagation(); // 이벤트 버블링 방지
              alert("PDF 다운로드 요청...")
            }}>
            {t('txtDownloadPDF')}
        </button>
    </div>
  );
}

export default ItemAttachment;
