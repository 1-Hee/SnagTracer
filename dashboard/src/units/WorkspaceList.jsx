// libs
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// components
import WorkspaceItem from "./WorkspaceItem"

export default function WorkspaceList() {
    const { t } = useTranslation();  // useTranslation hook;

    const allWorkspaces = Array.from({ length: 10 }).map((_, i) => ({
        title: `작업실 ${i + 1}`,
        leader: `리더${i + 1}`,
        memberCount: 5 + i,
        issueCount: 10 + i,
        participantCount: 3 + i,
    }));

    const [displayWorkspaces, setDisplayWorkspaces] = useState(allWorkspaces.slice(0, 5));
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef();

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        loadMore();
        }
    };

    const loadMore = () => {
        const currentLength = displayWorkspaces.length;
        const more = allWorkspaces.slice(currentLength, currentLength + 3);

        if (more.length > 0) {
        setDisplayWorkspaces(prev => [...prev, ...more]);
        } else {
        setHasMore(false);
        }
    };

    useEffect(() => {
        const ref = containerRef.current;
        ref.addEventListener('scroll', handleScroll);
        return () => ref.removeEventListener('scroll', handleScroll);
    }, [hasMore, displayWorkspaces]);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">{t('titleDashWorkpsace')}</h2>
            <span className="text-sm text-gray-500">{allWorkspaces.length}{t('txtItems')}</span>
        </div>

        <div
            ref={containerRef}
            className="h-80 overflow-y-auto divide-y divide-gray-200"
        >
            {displayWorkspaces.map((workspace, index) => (
            <WorkspaceItem key={index} {...workspace} />
            ))}
            {!hasMore && (
            <div className="text-center text-gray-400 py-2 text-sm">
                {t('prefixEndScroll')} {t('txtWorkSpace')}{t('suffixEndScroll')}
            </div>
            )}
        </div>
        </div>
    );
}
