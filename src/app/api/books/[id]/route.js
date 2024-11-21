// src/app/api/books/[id]/route.js
import { NextResponse } from 'next/server';

const books = [
    {
        id: 1,
        title: '해리 포터와 마법사의 돌',
        author: 'J.K. 롤링',
        coverImage: 'https://picsum.photos/400/600',
        description: `해리 포터와 마법사의 돌은 J.K. 롤링의 판타지 소설 시리즈인 '해리 포터' 시리즈의 첫 번째 작품입니다.

    머글(마법을 쓰지 못하는 일반인) 세계에서 살던 11살 소년 해리 포터는 자신이 마법사라는 사실을 알게 되고, 호그와트 마법학교에 입학하게 됩니다. 이곳에서 해리는 자신의 과거와 운명에 대해 알아가며, 친구들과 함께 모험을 겪게 됩니다.
    
    이 책은 우정, 용기, 선택의 중요성을 다루며, 어린이부터 성인까지 폭넓은 독자층에게 사랑받고 있습니다.`,
        category: '판타지/모험',
        level: '중급',
        rating: 4.8,
        reviewCount: 1234,
        tags: ['판타지', '모험', '영어원서', '베스트셀러'],
        preview: `제1장 살아남은 아이

    프리벳가 4번지에 사는 더즐리 부부는 자신들이 아주 평범하다는 것을 자랑스럽게 여기는 사람들이었다...`,
        reviews: [
            {
                id: 1,
                userName: '책벌레',
                content: '어린이를 위한 책이지만, 어른이 읽어도 재미있는 명작입니다.',
                rating: 5,
                createdAt: '2024-03-15T09:00:00.000Z'
            },
            {
                id: 2,
                userName: '독서광',
                content: '처음 읽었을 때의 그 신비로운 느낌을 잊을 수 없네요.',
                rating: 5,
                createdAt: '2024-03-14T15:30:00.000Z'
            }
        ],
        stats: {
            totalReaders: 2451,
            avgReadTime: 4.2,
            completionRate: 75,
            satisfaction: 89
        }
    },
    {
        id: 2,
        title: '토지',
        author: '박경리',
        coverImage: 'https://picsum.photos/400/600',
        description: `토지는 박경리 작가의 대하소설로, 한국 근대사를 배경으로 한 작품입니다.

    구한말부터 일제강점기까지의 역사적 격변기를 배경으로, 최참판댁 며느리 서희의 삶을 통해 한국인의 삶과 민족의 역사를 그려냅니다.
    
    이 작품은 한국 현대문학의 대표작으로 평가받고 있으며, 역사와 인간에 대한 깊은 통찰을 담고 있습니다.`,
        category: '현대문학',
        level: '고급',
        rating: 4.9,
        reviewCount: 856,
        tags: ['한국문학', '대하소설', '역사', '고전'],
        preview: '최참판댁은 멀리서 보나 가까이서 보나 어느모로 보나 추녀 마루끝이 하늘을 찌를 듯이 치쳐 올라간 양반집이었다...',
        reviews: [
            {
                id: 1,
                userName: '한국문학러버',
                content: '우리 역사와 삶의 본질을 깊이 있게 다룬 명작입니다.',
                rating: 5,
                createdAt: '2024-03-10T14:20:00.000Z'
            }
        ],
        stats: {
            totalReaders: 1523,
            avgReadTime: 12.5,
            completionRate: 65,
            satisfaction: 92
        }
    },
    {
        id: 3,
        title: '사피엔스',
        author: '유발 하라리',
        coverImage: 'https://picsum.photos/400/600',
        description: `사피엔스는 인류의 역사를 새로운 관점에서 조망한 세계적 베스트셀러입니다.

    인지혁명, 농업혁명, 과학혁명이라는 세 번의 큰 혁명을 통해 인류가 어떻게 발전해왔는지 설명하며, 우리의 미래에 대한 통찰을 제공합니다.
    
    인류학, 경제학, 생물학 등 다양한 분야를 아우르는 지식을 통해 인간의 본질을 탐구합니다.`,
        category: '인문/과학',
        level: '중급',
        rating: 4.7,
        reviewCount: 2891,
        tags: ['인문', '역사', '과학', '베스트셀러'],
        preview: '7만 년 전, 지구에는 최소 여섯 종의 인간이 살고 있었다. 그들 모두에게 미래가 있는 듯했다...',
        reviews: [
            {
                id: 1,
                userName: '지식탐험가',
                content: '인류 역사를 새로운 시각으로 바라볼 수 있게 해주는 책입니다.',
                rating: 5,
                createdAt: '2024-03-12T10:15:00.000Z'
            }
        ],
        stats: {
            totalReaders: 3256,
            avgReadTime: 6.8,
            completionRate: 78,
            satisfaction: 88
        }
    },
    {
        id: 4,
        title: '코스모스',
        author: '칼 세이건',
        coverImage: 'https://picsum.photos/400/600',
        description: `코스모스는 우주의 신비와 과학의 경이로움을 대중적인 언어로 풀어낸 과학교양서입니다.

    태양계의 형성부터 생명의 기원, 인류의 우주 탐사까지, 우주와 관련된 다양한 주제를 다루며 과학적 사고의 중요성을 강조합니다.
    
    아름다운 문체와 깊이 있는 과학적 통찰로 전 세계 독자들에게 사랑받고 있는 명저입니다.`,
        category: '과학',
        level: '중급',
        rating: 4.8,
        reviewCount: 1567,
        tags: ['과학', '우주', '물리학', '교양'],
        preview: '우주는 우리 안에 있다. 우리는 별들로부터 왔다. 우리는 별빛으로 만들어졌다...',
        reviews: [
            {
                id: 1,
                userName: '별똥별',
                content: '과학을 이렇게 아름답게 설명할 수 있다니 놀랍습니다.',
                rating: 5,
                createdAt: '2024-03-08T16:45:00.000Z'
            }
        ],
        stats: {
            totalReaders: 2145,
            avgReadTime: 5.5,
            completionRate: 72,
            satisfaction: 91
        }
    },
    {
        id: 5,
        title: '클린 코드',
        author: '로버트 C. 마틴',
        coverImage: 'https://picsum.photos/400/600',
        description: `클린 코드는 더 나은 코드를 작성하는 방법을 가르쳐주는 프로그래밍 필독서입니다.

    좋은 코드와 나쁜 코드를 구분하는 방법, 좋은 코드를 작성하는 방법과 나쁜 코드를 좋은 코드로 바꾸는 방법을 설명합니다.
    
    실제 사례를 통해 배우는 실용적인 프로그래밍 기법들을 담고 있으며, 모든 프로그래머가 읽어야 할 필수 도서로 평가받고 있습니다.`,
        category: '프로그래밍',
        level: '고급',
        rating: 4.9,
        reviewCount: 3421,
        tags: ['프로그래밍', '소프트웨어', '개발방법론', '베스트셀러'],
        preview: '코드는 요구사항을 표현하는 언어다. 우리가 새로운 요구사항을 도입하려면 코드를 변경해야 한다...',
        reviews: [
            {
                id: 1,
                userName: '코드장인',
                content: '프로그래머라면 반드시 읽어야 할 책입니다.',
                rating: 5,
                createdAt: '2024-03-05T11:30:00.000Z'
            },
            {
                id: 2,
                userName: '개발자',
                content: '실무에 바로 적용할 수 있는 내용들이 많아서 좋습니다.',
                rating: 4,
                createdAt: '2024-03-04T09:15:00.000Z'
            }
        ],
        stats: {
            totalReaders: 4521,
            avgReadTime: 8.2,
            completionRate: 85,
            satisfaction: 94
        }
    }
];

export async function GET(request, { params }) {
    try {
        // 비동기적으로 params에 접근
        const { id } = await params;

        // id를 숫자로 변환
        const bookId = parseInt(id, 10);
        const book = books.find((book) => book.id === bookId);

        if (!book) {
            return NextResponse.json(
                { message: 'Book not found' },
                { status: 404 }
            );
        }

        // 개발 테스트를 위한 인위적인 지연
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
