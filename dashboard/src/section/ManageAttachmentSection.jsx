// libs
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

// assets
import { HiSearch } from 'react-icons/hi'; //

// components
import ItemAttachment from "../units/ItemAttachment"

const ManageAttachmentSection = () => {
  const { t } = useTranslation();  // useTranslation hook;

  // fetchedItemAttachment
  const [itemAttachmentList, setItemAttachmentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc'); // 정렬 순서
  const [itemAttachmentCount, setItemAttachmentCount] = useState(0); // 로그인 한 사용자의 이슈 개수
  const [page, setPage] = useState(1); // 무한 스크롤을 위한 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 정렬 옵션명 리스트
  const [sortOptionList] = useState([
    { optionKey: "txtAsc" },
    { optionKey: "txtDesc" },
    { optionKey: "txtLatest" },
    { optionKey: "txtOldest" },
  ]);

  // 무한 스크롤을 위한 첨부파일 목록 로딩
  const loadItemAttachmentList = async () => {
    setLoading(true);
    const fetchedItemAttachment = [
        { 
          issueId:42663, 
          title:'[이슈] 로그인 오류 안내 메일', 
          workpace: 'Login System', 
          date: '2025-04-27', 
          downloadKey: 'test1234', 
          attachmentId:'1234',
        },
    ];
    setItemAttachmentList((prev) => [...prev, ...fetchedItemAttachment]); // 기존 이슈 목록에 새로운 작업실 목록 추가

    setItemAttachmentCount(userIssueList.length + fetchedBookmarks.length);
    setLoading(false);
  };

  // 페이지 로딩 시 첨부파일 목록 가져오기
  useEffect(() => {
    loadItemAttachmentList();
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
      <h2 className="text-2xl font-semibold mb-6">{t('manageAttachment')}</h2>
      <div className="border-t border-gray-300 mb-6"></div>
      <div className="relative mb-6">
      <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 pl-10 border border-mono300 rounded-xl"
          placeholder={t('hintSearchAttachment')}
      />
      <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pale-blue500" size={20} />
      </div>
      {/* 첨부파일 개수 및 정렬 */}
      <div className="flex justify-between mb-6 items-center">
          <div className="text-sm">{t('txtCntAttachment')}: {itemAttachmentCount} {t('txtItems')}</div>
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
          {itemAttachmentList
          .filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => (
              <div key={item.id} className="border p-4 rounded-md shadow-lg cursor-pointer transition-all duration-300 hover:bg-mono100">
              {/* IssueItem 컴포넌트 */}                    
                <ItemAttachment {...item}/>
              </div>
          ))}               
      </div>
      {loading && <div className="text-center mt-4">{t('txtLoading')}</div>}
    </div>
  );
};

export default ManageAttachmentSection;