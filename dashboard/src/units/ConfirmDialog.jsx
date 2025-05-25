// components/ConfirmDialog.tsx
import React from 'react';

const ConfirmDialog = ({ 
    isOpen, 
    onCancel, 
    onDelete,
    contentInfo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-l shadow-lg p-6 w-[300px]">
        <h2 className="text-lg font-bold mb-4">{contentInfo.title}</h2>
        <p className="text-sm text-gray-800 mb-1">
            {contentInfo.content}
        </p>
        <div className="flex justify-end space-x-8 mt-6">
          <button
            onClick={onCancel}
            className="text-sm text-mono600"
          >
            {contentInfo.cancel}
          </button>
          <button
            onClick={onDelete}
            className={`text-sm font-medium ${
                contentInfo.isDanger ? 'text-red500' : 'text-pale-blue500'
              }`}
          >
            {contentInfo.ok}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
