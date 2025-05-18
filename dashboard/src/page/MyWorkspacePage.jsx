// libs
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

// assets
import { HiSearch } from 'react-icons/hi'; //

// components
import WorkspaceItem from '../units/WorkspaceItem'; 
import RecentIssue from "../units/RecentIssue"

const MyWorkspacePage = () => {
  const { t } = useTranslation();  // useTranslation hook;

  const [workspaces, setWorkspaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc'); // 정렬 순서
  const [userWorkspacesCount, setUserWorkspacesCount] = useState(0); // 로그인 한 사용자의 작업실 개수
  const [page, setPage] = useState(1); // 무한 스크롤을 위한 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 정렬 옵션명 리스트
  const [sortOptionList] = useState([
    { optionKey: "txtAsc" },
    { optionKey: "txtDesc" },
    { optionKey: "txtLatest" },
    { optionKey: "txtOldest" },
  ]);  

  // 무한 스크롤을 위한 작업실 목록 로딩
  const loadWorkspaces = async () => {
    setLoading(true);
    const fetchedWorkspaces = [
      { id: 1, title: 'Workspace 1', leader: 'Alice', memberCount: 3, issueCount: 2, participantCount: 5, issue: { issueId:1234, title: 'Login Issue', date: '2025-04-01', author: 'User 1', content: 'Cannot login' } },
      { id: 2, title: 'Workspace 2', leader: 'Bob', memberCount: 4, issueCount: 1, participantCount: 6, issue: {  issueId:5678, title: 'API Error', date: '2025-04-02', author: 'User 2', content: 'API is down' } }
    ];
    setWorkspaces((prev) => [...prev, ...fetchedWorkspaces]); // 기존 작업실 목록에 새로운 작업실 목록 추가
    setLoading(false);
  };

  // 페이지 로딩 시 작업실 목록 가져오기
  useEffect(() => {
    loadWorkspaces();
  }, [page]);

  // 검색창 업데이트
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // 정렬 변경
  const handleSortChange = (event) => {
    setSortingOrder(event.target.value);
  };

  // 무한 스크롤 처리
  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  return (
    <div className='justify-center min-h-screen p-6 shadow bg-white rounded-l max-w-4xl mx-auto'>
      <h2 className="text-2xl font-semibold mb-6">{t('myWorkspace')}</h2>
      <div className="border-t border-gray-300 mb-6"></div>
      <div className="relative mb-6">
      <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 pl-10 border border-mono300 rounded-xl"
          placeholder={t('hintSearchWorkpsace')}
      />
      <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pale-blue500" size={20} />
      </div>
      {/* 작업실 개수 및 정렬 */}
      <div className="flex justify-between mb-6 items-center">
          <div className="text-sm">{t('txtCntWorkpsace')}: {userWorkspacesCount} {t('txtItems')}</div>
          <div className="flex items-center">
          <span className="mr-4 text-sm">{t('txtSortOrder')} :</span>
          <select
              value={sortingOrder}
              onChange={handleSortChange}
              className="p-2 border border-mono300 rounded text-sm"
          >
              {
                  sortOptionList.map((option, index) => (
                  <option key={index} value={option.optionKey}>
                      {t(option.optionKey)} {/* option.optionKey에 해당하는 텍스트 출력 */}
                  </option>
                  ))
              }
          </select>
          </div>
      </div>

      {/* 작업실 목록 */}
      <div
          className="space-y-6 overflow-y-auto max-h-[70vh]"
          // onScroll={handleScroll}
      >
          {workspaces
          .filter((workspace) =>
              workspace.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((workspace) => (
              <div key={workspace.id} className="border p-4 rounded-md shadow-lg">
              {/* WorkspaceItem 컴포넌트 */}
              <WorkspaceItem 
                  title={workspace.title}
                  leader={workspace.leader}
                  memberCount={workspace.memberCount}
                  issueCount={workspace.issueCount}
                  participantCount={workspace.participantCount}
              />

              {/* 최신 이슈 목록 */}
              <div className="ml-4 mt-4">
                  {                      
                      <RecentIssue 
                          id ={workspace.issue.issueId}
                          title = {workspace.issue.title}
                          date = {workspace.issue.date}
                          author = {workspace.issue.author}
                          content = {workspace.issue.content}
                      />
                  }
              </div>
              </div>
          ))}
      </div>
      {loading && <div className="text-center mt-4">{t('txtLoading')}</div>}
    </div>
  );
};

export default MyWorkspacePage;
