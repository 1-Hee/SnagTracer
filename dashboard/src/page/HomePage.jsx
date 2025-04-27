// libs
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import WorkspaceList from "../units/WorkspaceList"
import MyIssueList from "../units/MyIssueList"
import IssueResolution from "../units/IssueResolution"

// User Login Info
function ItemLoginInfo({label, value}) {
    return (
        <div className="flex items-center justify-between pb-2">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    )
}

const HomePage = () => {
    const { t } = useTranslation();  // useTranslation hook;
    // Sample Data
    const userInfo = {
        name: "John Doe",
        department: "Engineering",
        position: "Senior Developer",
        lastLogin: "2025-04-25 14:32",
    };
    
    return (
        <div className="flex justify-center min-h-screen p-4">
            <div className="w-full max-w-[712px] bg-white rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {/* t는 항상 최신 언어를 반영하니까, 그냥 t()를 직접 호출해서 써야 함 */}
                <span className="">{t('titleHomePage')}</span>
                </h1>
                {/* 사용자 프로필 */}
                <div className="space-y-4 mt-12">
                    <ItemLoginInfo label={t('userName')} value={userInfo.name} />
                    <ItemLoginInfo label={t('department')} value={userInfo.department} />
                    <ItemLoginInfo label={t('position')} value={userInfo.position} />
                    <ItemLoginInfo label={t('lastLogin')} value={userInfo.lastLogin} />   
                </div>
                <WorkspaceList/>
                <MyIssueList/>
                <IssueResolution total={10} resolved={7} />
                {/* Add bottom spacer */}
                <div className="my-12"></div> 
            </div>
        </div>
    )
}

export default HomePage;