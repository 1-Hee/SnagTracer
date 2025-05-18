// libs
import React  from "react";
import { useNavigate } from 'react-router-dom';

const IssueItem = ({ id, title, reporter, date, description, isRead }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/issueDetail/${id}`);
  };
  return (
    <div 
      className="border-b last:border-b-0" 
      onClick={handleClick}
      >
      <div className={`mb-1 ${isRead ? "font-normal text-gray-800" : "font-bold text-blue-600"}`}>
        [{id}] {title}
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
  );
}

export default IssueItem;