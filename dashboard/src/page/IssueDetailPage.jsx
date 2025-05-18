// libs
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Trash2, Pencil, X } from "lucide-react";

// assets

// components
import JoinMember from '../units/JoinMember';
import PDFViewer from '../units/PDFViewer';
import InfoRow from "../units/InfoRow"
import StatusBadge from "../units/StatusBadge"

// TODO 
// 1. 아래의 상태 값 및 라벨 데이터 표준화하기
// 2. PDF Viewer 다이얼로그 창 디자인 최적화

const testUrl = "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"

export default function IssueDetailPage() {
    const { issueId } = useParams();
    const navigate = useNavigate();

    const [pdfUrl, setPdfUrl] = useState(testUrl); // 나중에 백엔드에서 생성하는 url과 연동하기
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        // 단순 숫자 형태인지 체크 (또는 정규식 등 더 정밀하게 가능)
        const isValidId = /^\d+$/.test(issueId);
        if (!isValidId) {
          // navigate('/404'); // 또는 다른 fallback 경로
          alert("?")
          navigate('/')
        }
      }, [issueId, navigate]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">이슈 뷰어</h1>
            <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
        </div>

        <div className="space-y-4">
            {/* 이슈 정보 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <InfoRow label="이슈 제목" value="로그인 오류 해결 요청" />
            <InfoRow label="게시자" value={<JoinMember name="Ace" />} />
            <InfoRow label="생성 일자" value="2025-04-01" />
            <InfoRow label="작업 팀" value="문서 생성 플랫폼팀" />
            <InfoRow label="중요도" value={<StatusBadge text="매우 중요" color="red" />} />
            <InfoRow label="이슈 상태" value={<StatusBadge text="진행중" color="green" />} />
            </div>

            {/* 참조 인원 */}
            <div>
            <h3 className="text-sm font-medium text-gray-700">참조 인원 <span className="text-gray-500 text-xs">(6명)</span></h3>
            <div className="mt-2 flex flex-wrap gap-2">
                {["Ace", "Baylone", "Canny", "Doish", "Elice", "Frank"].map((name) => (
                <JoinMember key={name} name={name} />
                ))}
            </div>
            </div>

            {/* 이슈 내용 */}
            <div>
            <h3 className="text-sm font-medium text-gray-700">이슈 내용:</h3>
            <div className="mt-1 bg-gray-100 p-3 rounded-md text-sm text-gray-800 whitespace-pre-line">
                사용자 로그인 시도 시 "401 Unauthorized" 오류가 빈번하게 발생함.{"\n"}
                특히 카카오 소셜 로그인 연동 후, 앱 배포 처리 시 재현되는 것으로 추정됨.{"\n"}
                OAuth 흐름 처리 및 프론트 CORS 설정 문제로 의심되며, 로그 및 네트워크 확인이 필요함.
            </div>
            </div>

            {/* 첨부된 이메일 */}
            <div className="text-sm">
            <h3 className="font-medium text-gray-700">첨부된 이메일</h3>
            <a
                href="#"
                className="text-blue-600 underline text-sm mt-1 inline-block"
                onClick={() => setShowPdf(true)}
            >
                [로그인 오류 관련] 보안 로그인 사용자 문의 내역
            </a>
            </div>
        </div>
        {/* PDF Modal */}
        {showPdf && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
                <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">첨부된 PDF</h2>
                <button
                    onClick={() => setShowPdf(false)}
                    className="text-gray-500 hover:text-red-500"
                >
                    <X className="w-5 h-5" />
                </button>
                </div>
                <div className="border rounded">
                    <PDFViewer fileUrl={pdfUrl} />
                </div>
            </div>
            </div>
        )}
        </div>
  );
}

