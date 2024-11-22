// src/lib/api/bookService.js
export const testContent = `
<div class="page">
  <h2>1. 우리 동네 도서관 소개</h2>
  <p>우리 동네에는 아주 특별한 도서관이 있어요. 이 도서관은 나무로 만든 예쁜 2층 건물이에요.</p>
  <div class="image-container">
    <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66" alt="도서관 외부 전경" />
    <p class="image-caption">우리 동네 도서관의 모습</p>
  </div>
  <p>이 도서관은 마을 사람들이 함께 만들어 더욱 특별해요. 어린이부터 어른까지 모두가 즐겁게 이용할 수 있답니다.</p>
</div>

<div class="page">
  <h2>2. 도서관 1층: 어린이 공간</h2>
  <p>1층에는 어린이들을 위한 책이 가득해요. 알록달록한 그림책부터 재미있는 동화책까지 다양한 책들이 있답니다.</p>
  <div class="image-container">
    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" alt="도서관 내부 어린이 공간" />
    <p class="image-caption">도서관 1층 어린이 공간</p>
  </div>
  <p>편안한 쿠션과 작은 책상도 있어서 아이들이 편하게 책을 읽을 수 있어요. 때로는 동화 구연 시간도 있답니다.</p>
</div>

<div class="page">
  <h2>3. 도서관 2층: 일반 열람실</h2>
  <p>2층에는 어른들이 읽을 수 있는 책들이 있어요. 조용한 공간에서 편하게 책을 읽을 수 있죠.</p>
  <div class="image-container">
    <img src="https://images.unsplash.com/photo-1533294455009-a77b7557d2d1" alt="도서관 독서 공간" />
    <p class="image-caption">편안한 도서관 독서 공간</p>
  </div>
  <p>학생들을 위한 학습 공간과 어른들을 위한 독서 공간이 나누어져 있어요. 컴퓨터를 사용할 수 있는 자리도 있답니다.</p>
</div>

<div class="page">
  <h2>4. 특별한 '책 읽어주기' 시간</h2>
  <p>우리 도서관의 특별한 점은 바로 '책 읽어주기' 시간이에요. 매주 토요일 오후에는 선생님이 재미있는 책을 읽어주세요.</p>
  <div class="image-container">
    <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8" alt="책 읽어주기 시간" />
    <p class="image-caption">즐거운 책 읽어주기 시간</p>
  </div>
  <p>아이들은 선생님의 목소리로 듣는 이야기에 푹 빠져들어요. 때로는 역할극을 하며 더욱 재미있게 책을 즐기기도 해요.</p>
</div>

<div class="page">
  <h2>5. 다양한 도서관 활동</h2>
  <p>도서관에서는 다양한 활동도 할 수 있어요. 독서 감상문 쓰기, 그림 그리기, 퀴즈 풀기 등 재미있는 활동이 많답니다.</p>
  <div class="image-container">
    <img src="https://images.unsplash.com/photo-1524578271613-d550eacf6090" alt="도서관 활동" />
    <p class="image-caption">도서관에서 진행되는 다양한 활동들</p>
  </div>
  <p>이런 활동들을 통해 책 읽기가 더욱 즐거워져요. 여러분도 우리 도서관에 놀러오세요! 항상 환영합니다.</p>
</div>
`;

export const fetchBookContent = async (bookId) => {
    try {
        // 실제 API 호출
        const response = await fetch(`/api/books/${bookId}/content`);

        // API 호출이 실패하면 테스트 데이터 반환
        if (!response.ok) {
            return {
                title: '우리 동네 도서관 이야기',
                content: testContent,
                author: '김도서'
            };
        }

        return await response.json();
    } catch (error) {
        console.log('API 호출 실패, 테스트 데이터 사용:', error);
        // 에러 발생시 테스트 데이터 반환
        return {
            title: '우리 동네 도서관 이야기',
            content: testContent,
            author: '김도서'
        };
    }
};
