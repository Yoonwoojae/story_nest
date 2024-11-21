// src/components/common/ShareButton.js
'use client';

import { useState, useEffect } from 'react';
import { Share, Link, MessageCircle, X } from 'lucide-react';

export default function ShareButton() {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    // 마운트 된 후에 URL 가져오기
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowModal(false);
            }, 1500);
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
    };

    const handleShareSMS = () => {
        window.location.href = `sms:?body=${encodeURIComponent(currentUrl)}`;
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
                <Share className="w-4 h-4" />
                공유하기
            </button>

            {/* 모달 백드롭 */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-end sm:items-center justify-center"
                    onClick={() => setShowModal(false)}
                >
                    {/* 모달 컨텐츠 */}
                    <div
                        className="bg-white w-full sm:w-96 sm:rounded-2xl rounded-t-2xl p-6 mx-auto relative"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* 모달 헤더 */}
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">공유하기</h3>
                        </div>

                        {/* 공유 옵션 */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {/* 카카오톡 공유 - 나중에 구현 */}
                            <button
                                className="flex flex-col items-center gap-2 opacity-50 cursor-not-allowed"
                            >
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                                    K
                                </div>
                                <span className="text-sm text-gray-600">카카오톡</span>
                            </button>

                            {/* 문자 공유 */}
                            <button
                                onClick={handleShareSMS}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm text-gray-600">문자</span>
                            </button>

                            {/* 링크 복사 */}
                            <button
                                onClick={handleCopyLink}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Link className="w-6 h-6 text-gray-600" />
                                </div>
                                <span className="text-sm text-gray-600">
                                    {copied ? '복사완료' : '링크복사'}
                                </span>
                            </button>
                        </div>

                        {/* 링크 미리보기 */}
                        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg break-all">
                            {currentUrl}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
