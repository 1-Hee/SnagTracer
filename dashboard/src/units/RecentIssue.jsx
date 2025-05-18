// libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentIssue = ({ issueId, title, date, author, content}) => {
    const navigate = useNavigate();
    const handleIssueClick = () => {
        navigate(`/issueDetail/${issueId}`);
    };    
    return (
        <div 
        className="cursor-pointer p-2 transition-all duration-300 hover:bg-mono100 mb-4 p-4 rounded-md"
        onClick={handleIssueClick}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center mb-2">
                    <h4 className="font-medium">{title}</h4>
                    <p className="ml-4 text-sm text-gray-500">{date}</p>
                </div>
                <p className="text-sm text-gray-700">{author}</p>
            </div>
            
        <p className="mt-2 text-sm">{content}</p>
      </div>
    )
}

export default RecentIssue;