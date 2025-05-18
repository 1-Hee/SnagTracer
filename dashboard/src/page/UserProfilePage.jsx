// libs
import { useState, useEffect, useRef  } from 'react';
import { useTranslation } from "react-i18next";

// components
import ImagePreviewModal from "../units/ImagePreviewModal"

const UserProfilePage = () => {
    const { t } = useTranslation();  // useTranslation hook;        
    // dummy
    const [userInfo, setUserInfo] = useState({
            id:1234,
            userName:'홍길동',
            email:'seoyoon@example.com',
            department: '기획팀',
            position: '팀원'        
    });

    const [isRequestAuth, setIsRequestAuth] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [remainingTime, setRemainingTime] = useState('3:00');
    const detTimeStr = '3:00';
    const defTimer = 180;

    const timerRef = useRef(null); // 타이머 ID 저장용

    // 이미지 미리보기 모달 관리용.
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [previewImageSrc, setPreviewImageSrc] = useState('https://picsum.photos/200');

    // 모달 표시 토글 함수
    const handleImageClick = (src) => {
        setPreviewImageSrc(src);
        setIsImageModalOpen(true);
    };
      

    // ⏱️ 인증 요청 버튼 클릭 시
    const handleAuthRequest = () => {
        if (isRequestAuth) return; // 중복 요청 방지
    
        setIsRequestAuth(true);
        startTimer(defTimer); // 3분 = 180초
    };

    // ⏲️ 타이머 시작 함수
    const startTimer = (durationInSeconds) => {
        let time = durationInSeconds;
    
        timerRef.current = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    
        if (time <= 0) {
            alert(t('txtTimeOver'));
            clearInterval(timerRef.current);
            setIsRequestAuth(false);
            setRemainingTime(detTimeStr);
        }
    
        time -= 1;
        }, 1000);
    };
    

    // 🧹 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        };
    }, []);

    return (
        <div className="justify-center p-6 shadow bg-white rounded-l max-w-4xl mx-auto">
            {/* Image Preview Model */}
            { isImageModalOpen && 
                <ImagePreviewModal 
                    imageSrc={previewImageSrc} 
                    onDismiss={()=> {setIsImageModalOpen(false) }}
                    /> 
            }
            <h2 className="text-2xl font-semibold mb-6">{t('txtMyProfile')}</h2>
            <div className="border-t border-mono300 mb-6"></div>
            <div className="flex flex-col items-center space-y-2">
                <img
                    src={previewImageSrc}
                    alt="Profile Image"
                    className="w-36 h-36 rounded-full object-cover cursor-pointer"
                    onClick={(e)=> {handleImageClick(previewImageSrc)}}
                />
                <button className="text-sm text-pale-blue500 hover:underline pt-2 pb-3">{t('txtEditProfile')}</button>
            </div>

            <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between space-x-2 h-10">
                    <div className="flex h-full items-center">
                        <label className="w-16">{t('txtName')}</label>
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border rounded-md"
                            value={userInfo.name}
                            />
                    </div>
                    <button className="h-full w-20 bg-pale-blue600 text-white rounded text-sm">
                        {t('txtEdit')}
                    </button>
                </div>

                <div className="flex items-center justify-between space-x-2 h-10">
                    <div className="flex h-full items-center">
                        <label className="w-16">{t('txtEmail')}</label>
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border rounded-md bg-mono100 text-mono500"
                            value={userInfo.email}
                            readOnly
                            />
                    </div>
                    <button 
                        className="h-full w-20 bg-green600 text-white rounded text-sm"
                        onClick={handleAuthRequest}
                        >
                        {t('txtAuth')}
                    </button>
                </div>
                {/* Auth Code */}
                { isRequestAuth &&
                <div className="">
                    <div className="flex items-center h-10">
                        <div className="ml-auto flex h-full items-center">
                        <label className="mx-4">{t('txtAuthCode')}</label>
                        <input
                            type="text"
                            className="ml-auto w-32 mx-4 flex-1 px-1 py-2 border rounded-md"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                        />
                        </div>
                        <button className="h-full w-20 bg-pale-blue600 text-white rounded text-sm">
                        {t('txtCheck')}
                        </button>
                    </div>

                    {/* 시간 표시 영역을 오른쪽 정렬 */}
                    <div className="flex justify-end my-4">
                        <span className="text-sm text-mono500">
                        {t('txtTimeRemain')} : {remainingTime}
                        </span>
                    </div>
                </div>
                }

                {/* Deparment */}
                <div className="flex items-center justify-between space-x-2 h-10">
                    <label className="w-16">{t('txtDepartment')}</label>
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md bg-mono100"
                        value={userInfo.department}
                        readOnly
                        />
                </div>

                <div className="flex items-center justify-between space-x-2 h-10">
                    <label className="w-16">{t('txtPosition')}</label>
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md bg-mono100"
                        value={userInfo.position}
                        readOnly
                        />
                </div>
            </div>
            <div className="my-4 mt-8">
                <button className="transition-all duration-200 text-sm text-pale-blue500 hover:text-pale-blue300">
                    {t('txtChangePassword')}
                </button>
            </div>
        </div>
    );
}

export default UserProfilePage;