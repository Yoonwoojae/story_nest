// src/app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // 비밀번호 해싱
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 여기에서 실제 데이터베이스 작업을 수행합니다
        // hashedPassword를 저장

        return NextResponse.json({
            success: true,
            message: '회원가입이 완료되었습니다.',
            user: { email }
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
