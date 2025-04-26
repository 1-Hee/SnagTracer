import React from "react";
import { useNavigate } from "react-router-dom";

// assets
import bellIcon from "../assets/ic_bell.svg"; // 

function NotificationIcon({ count = 0 }) {
    return (
      <div className="relative cursor-pointer">
        <img src={bellIcon} alt="Notifications" className="w-4 h-4" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    );
  }
  
  export default NotificationIcon;
