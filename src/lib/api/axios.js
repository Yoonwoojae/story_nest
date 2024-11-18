// src/lib/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 응답 인터셉터 설정
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // 에러 응답 처리
        const errorMessage = error.response?.data?.message || '서버 에러가 발생했습니다.';
        // eslint-disable-next-line no-undef
        return Promise.reject(errorMessage);
    }
);

export default api;
