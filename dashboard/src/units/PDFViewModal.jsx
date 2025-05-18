// PDFViewModal.jsx
// libs
import React from 'react';
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";

// pdf.worker를 CDN 경로로 설정 
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// assets

// components
const PDFViewModal = ({pdfUrl, setShowPdf}) => {
    const { t } = useTranslation();  // useTranslation hook;    

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={(e)=>{setShowPdf(false)}}
            >
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">{t('attachedPDF')}</h2>
                    <button
                        onClick={() => setShowPdf(false)}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="border rounded">
                    <Document file={pdfUrl}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            </div>
        </div>
    )
}

export default PDFViewModal
