// 📁 PDFViewer.jsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ pdf.worker를 CDN 경로로 설정 (pdfjs-dist 버전은 실제 설치된 버전에 맞춰주세요)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({fileUrl}) {
  return (
    <Document file={fileUrl}>
      <Page pageNumber={1} />
    </Document>
  );
}
