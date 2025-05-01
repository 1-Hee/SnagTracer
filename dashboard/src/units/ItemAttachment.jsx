// libs
import React  from "react";
import { useTranslation } from "react-i18next";

const ItemAttachment = ({ id, title, workpace, date, downloadKey }) => {
  const { t } = useTranslation();  // useTranslation hook;

  return (
    <div className="relative border-b last:border-b-0 py-2 pr-16"> {/* 여백 확보를 위해 pr-16 추가 */}
        {/* Attachment Info */}
        <div>
            <div className="mb-1 font-normal text-gray-800">
            [{id}] {title}
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
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-pale-blue500 hover:bg-pale-blue600 text-white px-4 py-1 rounded shadow-sm transition-all"
            onClick={ ()=>{ alert("PDF 뷰어 열기")} }
        >
            {t('txtViewPDFFile')}
        </button>
    </div>
  );
}

export default ItemAttachment;
