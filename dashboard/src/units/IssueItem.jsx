// libs
import React  from "react";

const IssueItem = ({ id, title, reporter, date, description, isRead }) => {
  return (
    <div className="cursor-pointer p-2 transition-all duration-300 hover:bg-mono100 py-4 border-b last:border-b-0">
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