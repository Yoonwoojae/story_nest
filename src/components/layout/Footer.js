// src/components/common/Footer.js
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-indigo-600">Story Nest</span>
                        <p className="mt-4 text-gray-600">
                            아이들의 독서 여정을 더 즐겁고 의미있게 만들어주는 AI 기반 독서 플랫폼입니다.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">서비스</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#features" className="text-gray-600 hover:text-gray-900">주요 기능</a></li>
                            <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-900">이용 방법</a></li>
                            <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">요금제</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">고객지원</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#faq" className="text-gray-600 hover:text-gray-900">자주 묻는 질문</a></li>
                            <li><a href="#contact" className="text-gray-600 hover:text-gray-900">문의하기</a></li>
                            <li><a href="#privacy" className="text-gray-600 hover:text-gray-900">개인정보처리방침</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t">
                    <p className="text-gray-500 text-sm text-center">
                        © 2024 Story Nest. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
