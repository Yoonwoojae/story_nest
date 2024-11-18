// src/components/common/Header.js
import Link from 'next/link';

// src/components/common/Header.js
export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* 로고 */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <span className="text-2xl font-bold text-indigo-600">Story Nest</span>
                            </Link>
                        </div>
                        {/* 네비게이션 링크 */}
                        <div className="hidden md:block ml-10">
                            <div className="flex items-center space-x-8">
                                <a href="#features" className="text-gray-600 hover:text-indigo-600 hover:font-semibold transition-all">
                                    주요 기능
                                </a>
                                <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 hover:font-semibold transition-all">
                                    이용 방법
                                </a>
                                <a href="#pricing" className="text-gray-600 hover:text-indigo-600 hover:font-semibold transition-all">
                                    요금제
                                </a>
                                <a href="#faq" className="text-gray-600 hover:text-indigo-600 hover:font-semibold transition-all">
                                    FAQ
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 로그인/회원가입 버튼 */}
                    <div className="flex items-center space-x-4">
                        <Link href="/login">
                            <button className="text-gray-600 hover:text-indigo-600 px-3 py-2 transition-colors">
                                로그인
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition-colors font-semibold">
                                무료로 시작하기
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
