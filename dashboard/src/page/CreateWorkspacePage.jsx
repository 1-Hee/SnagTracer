// libs
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

// assets

// components
import JoinMember from "../units/JoinMember"

const CreateWorkspacePage = () => {
    const { t } = useTranslation();  // useTranslation hook;    

    const [projectName, setProjectName] = useState('');
    const [domainName, setDomainName] = useState('');
    const [memberSearch, setMemberSearch] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [availableMembers, setAvailableMembers] = useState([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      // Add more dummy members for search
    ]);
  
    // 팀원 검색 및 추가
    const handleSearchChange = (e) => {
      setMemberSearch(e.target.value);
    };
  
    const handleAddMember = () => {
      const member = availableMembers.find(
        (m) => m.name.toLowerCase() === memberSearch.toLowerCase()
      );
      if (member && !selectedMembers.includes(member)) {
        setSelectedMembers([...selectedMembers, member]);
        setMemberSearch('');
      }
    };
  
    // 작업실 생성 버튼 클릭
    const handleCreateWorkspace = () => {
      // Logic to create workspace goes here
      console.log('Workspace Created:', { projectName, domainName, selectedMembers });
    };
  
    return (
      <div className="justify-center p-6 shadow bg-white rounded-l max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{t('createWorkspace')}</h2>  
        <div className="border-t border-gray-300 mb-4 mt-7"></div>
  
        {/* 프로젝트 이름 */}
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-base font-medium text-gray-700">
            {t('txtProject')}
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
            placeholder={t('hintPjtName')}
          />
        </div>
  
        {/* 도메인 명 */}
        <div className="mb-4">
          <label htmlFor="domainName" className="block text-base font-medium text-gray-700">
            {t('txtDomain')}
          </label>
          <input
            id="domainName"
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
            placeholder={t('hintDomain')}
          />
        </div>
  
        {/* 팀원 추가 */}
        <div className="mb-4">
          <label htmlFor="memberSearch" className="block text-base font-medium text-gray-700">
            {t('txtAddMember')}
          </label>
          <div className="flex mt-2">
            <input
                id="memberSearch"
                type="text"
                value={memberSearch}
                onChange={handleSearchChange}
                className="flex-grow p-3 pl-3 border border-gray-300 rounded-md"
                placeholder={t('hintAddMember')}
            />
            <button
                type="button"
                onClick={handleAddMember}
                className="w-1/6 text-white bg-pale-blue500 p-2 rounded-r ml-6 rounded-md transition-all duration-300 hover:bg-pale-blue700"
            >
                {t('txtAdd')}
            </button>
            </div>
        </div>
  
        {/* 선택된 팀원 목록 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700">{t('txtSelectedMember')}</h4>
          <div className="flex mt-2">
            {selectedMembers.map((member, _) => (
              <JoinMember name={member.name} />
            ))}
          </div>
        </div>
  
        {/* 작업실 생성하기 버튼 */}
        <div className="mt-12 mb-2">
          <button
            onClick={handleCreateWorkspace}
            className=" w-full p-3 bg-green500 text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-green700"
          >
            {t('txtCreate')}
          </button>
        </div>

      </div>
    );
};

export default CreateWorkspacePage;
