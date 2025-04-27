// libs
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function IssueItem({ id, title, reporter, date, description, isRead }) {
  return (
    <div className="cursor-pointer p-2 transition-all duration-300 hover:bg-mono100 py-4 border-b last:border-b-0">
      <div className={`mb-1 ${isRead ? "font-normal text-gray-800" : "font-bold text-blue-600"}`}>
        [{id}] {title}
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <span>{reporter}</span>
        <span className="mx-2">•</span>
        <span>{date}</span>
      </div>
      <div className="text-sm text-gray-400 truncate">
        {description}
      </div>
    </div>
  );
}

export default function MyIssueList() {
    const { t } = useTranslation();  // useTranslation hook;
    
    const allIssues = Array.from({ length: 10 }).map((_, i) => ({
        id: `44521${i}`,
        title: `테스트 이슈 ${i + 1}`,
        reporter: `user${i}@test.com`,
        date: `2025-04-${String(i + 1).padStart(2, "0")}`,
        description: `이슈 설명 텍스트입니다. (${i + 1})`,
        isRead: i % 3 === 0 ? false : true, // 3개마다 읽지 않은 이슈로 설정
    }));

    const [displayIssues, setDisplayIssues] = useState(allIssues.slice(0, 5));
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef();

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        loadMore();
        }
    };

    const loadMore = () => {
        const currentLength = displayIssues.length;
        const more = allIssues.slice(currentLength, currentLength + 3);

        if (more.length > 0) {
        setDisplayIssues(prev => [...prev, ...more]);
        } else {
        setHasMore(false);
        }
    };

    useEffect(() => {
        const ref = containerRef.current;
        ref.addEventListener('scroll', handleScroll);
        return () => ref.removeEventListener('scroll', handleScroll);
    }, [hasMore, displayIssues]);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">{t('titleMyIssue')}</h2>
            <span className="text-sm text-gray-500">{allIssues.length}{t('txtItems')}</span>
        </div>

        <div
            ref={containerRef}
            className="h-80 overflow-y-auto divide-y divide-gray-200"
        >
            {displayIssues.map((issue, index) => (
            <IssueItem key={index} {...issue} />
            ))}
            {!hasMore && (
            <div className="text-center text-gray-400 py-2 text-sm">
                {t('prefixEndScroll')} {t('txtIssue')}{t('suffixEndScroll')}
            </div>
            )}
        </div>
        </div>
    );
}
