// libs
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import SidebarItem from "./units/SidebarItem";
import LanguageSwitcher from "./units/LanguageSwitcher"
import ProfileIcon from "./units/ProfileIcon";
import NotificationIcon from "./units/NotificationIcon";

// pages
import HomePage from "./page/HomePage"
import MyWorkspacePage from "./page/MyWorkspacePage"
import CreateWorkspacePage from "./page/CreateWorkspacePage"
import AddIssuePage from "./page/AddIssuePage"
import MyBookmarkPage from "./page/MyBookmarkPage"
import ManageAttachmentPage from "./page/ManageAttachmentPage"
import UserProfilePage from "./page/UserProfilePage"
import ManageUserPage from "./page/ManageUserPage"
import IssueViewPage from "./page/IssueViewPage"
import WorkspaceViewPage from "./page/WorkspaceViewPage"

// assets
import iconHome from './assets/ic_home.svg';
import iconWorkspace from './assets/ic_workspace.svg';
import iconCreateWorkspace from './assets/ic_create_workspace.svg';
import iconAddIssue from './assets/ic_add_issue.svg';
import iconBookmark from './assets/ic_bookmark.svg';
import iconAttachment from './assets/ic_attachment.svg';
import iconMyProfile from './assets/ic_my_info.svg';
import iconManageUser from './assets/ic_manage_user.svg';

const sidebarItems = [
  { icon: iconHome, labelKey: "home", path:"/" },
  { icon: iconWorkspace, labelKey: "myWorkspace", path:"/myWorkspace" },
  { icon: iconCreateWorkspace, labelKey: "createWorkspace", path:"/createWorkspace"  },
  { icon: iconAddIssue, labelKey: "addIssue", path:"/addIssue"  },
  { icon: iconBookmark, labelKey: "myBookmark", path:"/myBookmark"  },
  { icon: iconAttachment, labelKey: "manageAttachment", path:"/manageAttachment"  },
  { icon: iconMyProfile, labelKey: "myProfile", path:"/myProfile"  },
  { icon: iconManageUser, labelKey: "manageUser", path:"/manageUser" },
];

const App = () => {
    const { t } = useTranslation();  // useTranslation hook;

    const [isSideOpen, setIsSideOpen] = useState(true);

    return(
      <div className="flex flex-col h-screen">
        {/* top bar */}
        <header className="h-14 bg-mono300 text-white flex items-center px-4">
          <button
            onClick={()=>{setIsSideOpen(!isSideOpen)}}
            className="mr-4 text-xl"
          >
            ☰         
          </button>
          <h1 className="text-base font-semibold">Snag Tracer</h1>
          {/* 오른쪽 영역 */}
          <div className="flex items-center ml-auto space-x-4">
              <LanguageSwitcher />
              <NotificationIcon count={3} />
              <ProfileIcon />
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`transition-all duration-300 bg-mono50 text-black ${isSideOpen ? 'w-64' : 'w-0'} overflow-hidden`}
          >
            <div className="p-4">
              <ul>
                {sidebarItems.map((item, index) => 
                {
                  if(index === 4){
                    return <div>
                      <div className="border-t border-gray-300 my-3"></div>
                      <SidebarItem key={index} icon={item.icon} label={t(item.labelKey)} path={item.path}/>
                    </div>
                  }else {
                    return <SidebarItem key={index} icon={item.icon} label={t(item.labelKey)} path={item.path}/>
                  }                  
                }
                )}
              </ul>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1 bg-gray-50 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/myWorkspace" element={<MyWorkspacePage/>} />
              <Route path="/createWorkspace" element={<CreateWorkspacePage/>} />
              <Route path="/addIssue" element={<AddIssuePage/>} />
              <Route path="/myBookmark" element={<MyBookmarkPage/>} />
              <Route path="/manageAttachment" element={<ManageAttachmentPage/>} />
              <Route path="/myProfile" element={<UserProfilePage/>} />
              <Route path="/manageUser" element={<ManageUserPage/>} />
              <Route path="/issueDetail/:issueId" element={<IssueViewPage />} />        
              <Route path="/workspace/:workspaceId" element={<WorkspaceViewPage/>} />                    
            </Routes>
          </main>
        </div>
      </div>
    )
}

export default App;