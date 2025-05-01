// libs
import React from 'react';
import { useTranslation } from "react-i18next";

const ImagePreviewModal = ({imageSrc, onDismiss}) => {
    const { t } = useTranslation();  // useTranslation hook;        

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
            onClick={()=>{onDismiss()}}
            >
            <div className="bg-white rounded-xl shadow-xl p-4 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{t('txtPreview')}</h3>
                <button onClick={() => onDismiss()}
                className="text-gray-500 hover:text-gray-700"
                >
                ✕
                </button>
            </div>
            <img
                src={imageSrc}
                alt="preview"
                className="w-full max-h-[75vh] object-contain rounded"
            />
            </div>
        </div>
    )
}

export default ImagePreviewModal;