// components/UserTable.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// assets
import { HiSearch } from 'react-icons/hi'; //

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   department: string;
//   status: "승인 대기" | "승인 완료";
//   role: "사용자" | "관리자";
// };


const users = [
  {
    id: 1,
    name: "이서윤",
    email: "seoyoon@example.com",
    department: "기획팀",
    status: "승인 대기",
    role: "사용자",
  },
  {
    id: 2,
    name: "박진우",
    email: "jinwoo@example.com",
    department: "개발팀",
    status: "승인 완료",
    role: "사용자",
  },
  {
    id: 3,
    name: "오승택",
    email: "taekoh@example.com",
    department: "경영관리",
    status: "승인 완료",
    role: "관리자",
  },
  // 추가 사용자...
    // 더미 유저 추가
    ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 4,
        name: `유저${i + 4}`,
        email: `user${i + 4}@example.com`,
        department: "개발팀",
        status: i % 2 === 0 ? "승인 완료" : "승인 대기",
        role: i % 3 === 0 ? "관리자" : "사용자",
      })),
];

const ManageUserPage = () => {
    const { t } = useTranslation();  // useTranslation hook;

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    // 검색창 업데이트
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const usersPerPage = 10;
  
    const handleApprove = (id) => {
      console.log(`승인: ${id}`);
    };
  
    const handleReject = (id) => {
      console.log(`거절: ${id}`);
    };
  
    const handleCancel = (id) => {
      console.log(`승인 취소: ${id}`);
    };
  
    // 페이징 계산
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);
  
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

  return (
    <div className="justify-center p-6 shadow bg-white rounded-l max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">{t('txtUserManage')}</h2>
        <div className="border-t border-gray-300 mb-6"></div>
        <div className="relative mb-6">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 pl-10 border border-mono300 rounded-xl"
                placeholder={t('hintSearhUser')}
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pale-blue500" size={20} />
        </div>

      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">{t('txtName')}</th>
            <th className="p-2">{t('txtEmail')}</th>
            <th className="p-2">{t('txtDepartment')}</th>
            <th className="p-2">{t('txtJoinStatus')}</th>
            <th className="p-2">{t('txtUserRole')}</th>
            <th className="p-2">{t('txtAcceptStatus')}</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.department}</td>
              <td className="p-2">
                <span
                  className={
                    user.status === "승인 대기"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }
                >
                  {user.status}
                </span>
              </td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                {user.status === "승인 대기" ? (
                  <>
                    <button
                      className="bg-green-500 text-white text-xs px-3 py-1 rounded"
                      onClick={() => handleApprove(user.id)}
                    >
                      승인
                    </button>
                    <button
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                      onClick={() => handleReject(user.id)}
                    >
                      거절
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded"
                    onClick={() => handleCancel(user.id)}
                  >
                    승인 취소
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 컨트롤 */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-30"
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 text-sm border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded disabled:opacity-30"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default ManageUserPage;