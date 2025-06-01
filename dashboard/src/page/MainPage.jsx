// libs
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { logout } from "../auth"

// components
import SidebarItem from "../units/SidebarItem";
import LanguageSwitcher from "../units/LanguageSwitcher"
import ProfileIcon from "../units/ProfileIcon";
import NotificationIcon from "../units/NotificationIcon";

// pages
import AddIssueSection from "../section/AddIssueSection"
import CreateWorkspaceSection from "../section/CreateWorkspaceSection"
import HomeSection from "../section/HomeSection"
import IssueViewSection from "../section/IssueViewSection"
import ManageAttachmentSection from "../section/ManageAttachmentSection"
import ManageUserSection from "../section/ManageUserSection"
import MyBookmarkSection from "../section/MyBookmarkSection"
import MyWorkspaceSection from "../section/MyWorkspaceSection"
import UserProfileSection from "../section/UserProfileSection"
import WorkspaceViewSection from "../section/WorkspaceViewSection"

// assets
import iconHome from '.././assets/ic_home.svg';
import iconWorkspace from '.././assets/ic_workspace.svg';
import iconCreateWorkspace from '.././assets/ic_create_workspace.svg';
import iconAddIssue from '.././assets/ic_add_issue.svg';
import iconBookmark from '.././assets/ic_bookmark.svg';
import iconAttachment from '.././assets/ic_attachment.svg';
import iconMyProfile from '.././assets/ic_my_info.svg';
import iconManageUser from '.././assets/ic_manage_user.svg';

const sidebarItems = [
  { icon: iconHome, labelKey: "home", menuName:"" },
  { icon: iconWorkspace, labelKey: "myWorkspace", menuName:"myWorkspace" },
  { icon: iconCreateWorkspace, labelKey: "createWorkspace", menuName:"createWorkspace"  },
  { icon: iconAddIssue, labelKey: "addIssue", menuName:"addIssue"  },
  { icon: iconBookmark, labelKey: "myBookmark", menuName:"myBookmark"  },
  { icon: iconAttachment, labelKey: "manageAttachment", menuName:"manageAttachment"  },
  { icon: iconMyProfile, labelKey: "myProfile", menuName:"myProfile"  },
  { icon: iconManageUser, labelKey: "manageUser", menuName:"manageUser" },
];

const MainPage = () => {
    const { t } = useTranslation();  // useTranslation hook;
    const [isSideOpen, setIsSideOpen] = useState(true);
    const [searchParams] = useSearchParams();
    const menu = searchParams.get("menu"); // menu 파라미터 검색

    const renderContent = () => { // 컴포넌트 렌더링 함수
        switch (menu) {
          case "addIssue":
            return <AddIssueSection/>
          case "createWorkspace":
            return <CreateWorkspaceSection/>
          case "issueDetail":
            return <IssueViewSection />
          case "manageAttachment":
            return <ManageAttachmentSection/>
          case "manageUser":
            return <ManageUserSection />
          case "myBookmark":
            return <MyBookmarkSection/>
          case "myWorkspace":
            return <MyWorkspaceSection/>
          case "myProfile":
            return <UserProfileSection/>
          case "workspace":
            return <WorkspaceViewSection/>
          default:
            return <HomeSection/>
        }
      };

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
              <div onClick={(e)=>{logout()}}>   
                  <NotificationIcon count={3} />                
              </div>
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
                            <SidebarItem 
                              key={index} 
                              icon={item.icon} 
                              label={t(item.labelKey)} 
                              menuName={item.menuName}
                              />
                          </div>
                  }else {
                    return <SidebarItem 
                              key={index} 
                              icon={item.icon} 
                              label={t(item.labelKey)} 
                              menuName={item.menuName}
                              />
                  }                  
                }
                )}
              </ul>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1 bg-gray-50 p-6 overflow-auto">
            {renderContent() }
          </main>
        </div>
      </div>
    )
}

export default MainPage;