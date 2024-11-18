// src/app/login/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 여기에 로그인 API 연동 추가 예정
            console.log('로그인 시도:', formData);
            // 임시로 메인 페이지로 리다이렉트
            router.push('/dashboard');
        } catch (err) {
            setError('로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        // 소셜 로그인 처리
        console.log(`${provider} 로그인 시도`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Toaster position="top-center" />
            {/* 로딩 스피너 */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                    로그인
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* 에러 메시지 */}
                    {error && (
                        <div className="mb-4 bg-red-50 text-red-500 p-4 rounded-md">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                이메일
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                비밀번호
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    로그인 상태 유지
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    비밀번호 찾기
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                로그인
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                  간편 로그인
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('kakao')}
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#FEE500] px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-[#FEE500]/90"
                            >
                                <Image
                                    src="/kakao-icon.svg"
                                    alt="Kakao"
                                    width={24}
                                    height={24}
                                />
                                카카오로 로그인
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialLogin('naver')}
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-[#03C75A] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#03C75A]/90"
                            >
                                <Image
                                    src="/naver-icon.svg"
                                    alt="Naver"
                                    width={24}
                                    height={24}
                                />
                                네이버로 로그인
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <Image
                                    src="/google-icon.svg"
                                    alt="Google"
                                    width={24}
                                    height={24}
                                />
                                구글로 로그인
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        아직 계정이 없으신가요?{' '}
                        <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            회원가입하기
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
