// libs
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

// assets
import { HiSearch } from 'react-icons/hi'; //

// components
import IssueItem from "../units/IssueItem"

const MyBookmarks = () => {
  const { t } = useTranslation();  // useTranslation hook;

  const [userIssueList, setUserIssueList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc'); // 정렬 순서
  const [userIssueCount, setUserIssueCount] = useState(0); // 로그인 한 사용자의 이슈 개수
  const [page, setPage] = useState(1); // 무한 스크롤을 위한 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 정렬 옵션명 리스트
  const [sortOptionList] = useState([
    { optionKey: "txtAsc" },
    { optionKey: "txtDesc" },
    { optionKey: "txtLatest" },
    { optionKey: "txtOldest" },
    { optionKey: "txtImportance" },
  ]);

  // 무한 스크롤을 위한 이슈 목록 로딩
  const loadIssueList = async () => {
    setLoading(true);
    const fetchedBookmarks = [
        {id:42663, title:'Issue 1', reporter: 'User 1', date: '2025-04-27', description: 'This is Issue 1', isRead: 'false'},
        {id:34345, title:'Issue 2', reporter: 'User 2', date: '2025-04-27', description: 'This is Issue 2', isRead: 'true'},
        {id:22456, title:'Issue 3', reporter: 'User 3', date: '2025-04-27', description: 'This is Issue 3', isRead: 'true'},
    ];
    setUserIssueList((prev) => [...prev, ...fetchedBookmarks]); // 기존 이슈 목록에 새로운 작업실 목록 추가
    setUserIssueCount(userIssueList.length + fetchedBookmarks.length);
    setLoading(false);
  };

  // 페이지 로딩 시 작업실 목록 가져오기
  useEffect(() => {
    loadIssueList();
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
    <div className='flex justify-center min-h-screen p-4'>
        <div className="w-full max-w-[712px] bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">{t('myBookmark')}</h2>
            <div className="border-t border-gray-300 mb-6"></div>
            <div className="relative mb-6">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 pl-10 border border-mono300 rounded-xl"
                placeholder={t('hintSearchIssue')}
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pale-blue500" size={20} />
            </div>
            {/* 북마크 개수 및 정렬 */}
            <div className="flex justify-between mb-6 items-center">
                <div className="text-sm">{t('txtCntIssue')}: {userIssueCount} {t('txtItems')}</div>
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

            {/* 이슈 목록 */}
            <div
                className="space-y-3 overflow-y-auto max-h-[70vh]"
                // onScroll={handleScroll}
            >
                {userIssueList
                .filter((issue) =>
                    issue.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((issue) => (
                    <div key={issue.id} className="border p-4 rounded-md shadow-lg cursor-pointer transition-all duration-300 hover:bg-mono100">
                    {/* IssueItem 컴포넌트 */}                    
                      <IssueItem
                            id = {issue.id}
                            title = {issue.title}
                            reporter = {issue.reporter}
                            date = {issue.date}
                            description = {issue.description}
                            isRead = {issue.isRead}
                        />
                    </div>
                ))}               
            </div>
            {loading && <div className="text-center mt-4">{t('txtLoading')}</div>}
        </div>
    </div>
  );
};

export default MyBookmarks;