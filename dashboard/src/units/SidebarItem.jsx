import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon, label, menuName }) {
    const navigate = useNavigate();

    return (
        <li className="flex items-center mb-2 hover:bg-mono300 
        transition-all duraition-300 
        focus:outline-none cursor-pointer 
        p-2 rounded"
        onClick={() => {
            // if(!menuName) return;
            navigate(`/home?menu=${menuName}`);
        }}
        >
            <img src={icon} alt="icon" className="w-4 h-4 mr-4" />
            <span className="">{label}</span>
        </li>
    );
  }
  
  export default SidebarItem;