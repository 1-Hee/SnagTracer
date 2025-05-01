// libs
import React, { useState } from "react";
import { useTranslation } from "react-i18next";


export default function IssueForm({title, emailList}) {
    const { t } = useTranslation();  // useTranslation hook;

    const [showEmails, setShowEmails] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <hr className="mb-6" />

        {/* 제목 */}
        <div className="mb-4">
            <label className="block font-medium mb-1">
            {t('txtAddIssue')}<span className="text-red-500">*</span>
            </label>
            <input
            type="text"
            placeholder={t('hintIssueTitle')}
            className="w-full p-3 border rounded bg-gray-100"
            />
        </div>

        {/* 내용 */}
        <div className="mb-4">
            <label className="block font-medium mb-1">
            {t('txtIssueContent')} <span className="text-red-500">*</span>
            </label>
            <textarea
            rows={5}
            placeholder={t('hintIssueContent')}
            className="w-full p-3 border rounded bg-gray-100"
            />
        </div>

        {/* 작업실 + 중요도 */}
        <div className="mb-4 flex space-x-4">
            <div className="flex-1">
            <label className="block font-medium mb-1">
                {t('txtWorkSpace')} <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                placeholder={t('hintWorkspace')}
                className="w-full p-3 border rounded bg-gray-100"
            />
            </div>
            <div className="flex-1">
            <label className="block font-medium mb-1">
                {t('txtImportant')} <span className="text-red-500">*</span>
            </label>
            <select className="w-full p-3 border rounded bg-gray-100">
                {/* 이부분은 서버로부터 받아올 것... */}
                <option>보통</option>
                <option>높음</option>
                <option>긴급</option>
            </select>
            </div>
        </div>

        {/* 팀원 추가 */}
        <h1 className="block font-medium mb-1">{t('txtTeamList')}</h1>
        <div className="mb-4 flex items-center space-x-2">
            <input
            type="text"
            placeholder={t('hintSearhUser')}
            className="flex-1 p-3 border rounded bg-gray-100"
            />
            <button className="px-4 py-2 bg-slate-600 text-white rounded">
            {t('txtAdd')}
            </button>
        </div>

        {/* 이메일 불러오기 토글 버튼 */}
        <div className="mb-4">
            <button
            onClick={() => setShowEmails(!showEmails)}
            className="flex items-center px-4 py-2 bg-slate-600 text-white rounded"
            >
            📧 {t('txtLoadGmail')}
            </button>
        </div>

        {/* 이메일 리스트 (토글에 따라 표시) */}
        {showEmails && (
            <div className="mb-4 border rounded divide-y">
            {emailList.map((email) => (
                <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className="p-3 cursor-pointer hover:bg-gray-100"
                >
                <div className="font-semibold">{email.subject}</div>
                <div className="text-sm text-gray-500">
                    {email.sender} · {email.date}
                </div>
                <div className="text-sm truncate">{email.preview}</div>
                </div>
            ))}
            </div>
        )}

        {/* 선택된 이메일 표시 */}
        {selectedEmail && (
            <div className="mb-6 bg-gray-200 p-3 rounded text-sm">
            <strong>{t('txtSelectedEmail')} :</strong> {selectedEmail.subject}
            </div>
        )}

        {/* 제출 버튼 */}
        <button className="w-full py-3 bg-green-700 text-white rounded text-lg">
            {t('txtRegister')}
        </button>
        </div>
    );
}