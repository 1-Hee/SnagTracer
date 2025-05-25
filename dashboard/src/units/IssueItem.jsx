// libs
import React  from "react";
import { useNavigate } from 'react-router-dom';

const IssueItem = ({ issueId, title, reporter, date, description, isRead }) => {
  const navigate = useNavigate();
  const handleIssueClick = () => {
    // navigate(`/issueDetail/${issueId}`);
    // navigate(`home?menu=issueDetail&id=${issueId}`);
    navigate(`/home?menu=issueDetail&issueId=${issueId}`);
    // No routes matched location "/home/home?menu=issueDetail&id=42663"
  };
  return (
    <div className="border p-4 rounded-md shadow-lg cursor-pointer transition-all duration-300 hover:bg-mono100">
        <div 
        className="border-b last:border-b-0" 
        onClick={handleIssueClick}
        >
        <div className={`mb-1 ${isRead ? "font-normal text-gray-800" : "font-bold text-blue-600"}`}>
          [{issueId}] {title}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <span>{reporter}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <div className="text-sm text-gray-400 truncate">
          {description}
        </div>
      </div>
    </div>
  );
}

export default IssueItem;