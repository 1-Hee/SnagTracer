
import React from "react";

const InfoRow = ({ label, value }) => {
    return (
        <div className="flex space-x-2">
          <span className="w-24 text-gray-500">{label}</span>
          <span className="flex-1 font-medium text-gray-800">{value}</span>
        </div>
      );  
}

export default InfoRow