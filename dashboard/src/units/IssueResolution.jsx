// libs
import React from 'react';
import { useTranslation } from "react-i18next";


const IssueResolution = ({total, resolved}) => {
    const { t } = useTranslation();  // useTranslation hook;
    
    // 해결률 계산
    const resolutionPercentage = (resolved / total) * 100;  
    return (
        <div className="p-6 bg-white rounded-xl p-6 mt-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6 mt-2">{t('titleIssueRatio')}</h2>
        <div className="flex justify-between mb-4">
            <span>{t('txtTotalIssue')}: {total} {t('txtItems')}</span>
            <span>{t('txtResolvedIssue')}: {resolved} {t('txtItems')}</span>
        </div>
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
            <span className="text-sm font-semibold">{t('txtResolutionRate')}</span>
            <span className="text-sm font-semibold">{resolutionPercentage.toFixed(2)}%</span>
            </div>
            <div className="flex mb-2">
            <div className="w-full bg-mono200 rounded-full h-2.5">
                <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${resolutionPercentage}%` }}
                ></div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default IssueResolution;
