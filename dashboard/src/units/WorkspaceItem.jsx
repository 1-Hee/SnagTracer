import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const WorkspaceItem = ({ workId, title, leader, memberCount, issueCount, participantCount }) => {
    const navigate = useNavigate();
    const handleWorkspaceClick = () => {
        navigate(`/home?menu=workspace&workId=${workId}`);
    };        
    const { t } = useTranslation();  // useTranslation hook;    
    return (
        <div className="cursor-pointer p-2 transition-all duration-300 hover:bg-mono100 rounded-md flex items-center justify-between py-4 border-b last:border-b-0"
            onClick={handleWorkspaceClick}>
            <div>
                <div className="text-md font-semibold text-gray-800">{title}</div>
                <div className="text-sm text-gray-500 mt-1">
                {t('txtIssue')}: {issueCount}{t('txtItems')} • {t('txtMember')}: {participantCount} {t('txtPeople')}
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-pale-blue300 t1ext-white flex items-center justify-center mr-2">
                {leader[0]}
                </div>
                <span className="text-sm text-mono800">{leader} {t('txtAnd')} {memberCount} {t('txtOther')}</span>
            </div>
        </div>
    );
}

export default WorkspaceItem;