// src/lib/services/comprehensionService.js

// 중요한 문장 패턴을 감지하기 위한 키워드
const IMPORTANT_PATTERNS = [
    '중요하다',
    '핵심',
    '주요',
    '특징',
    '결론',
    '따라서',
    '결과적으로',
    '특히',
    '반드시',
    '요약하면'
];

// 개념을 설명하는 패턴
const CONCEPT_PATTERNS = [
    '의미한다',
    '뜻한다',
    '말한다',
    '정의',
    '개념',
    '이란',
    '이것은',
    '즉',
    '예를 들어'
];

export const analyzeText = (text, originalContent) => {
    // 키워드 추출
    const keywords = {
        important: {
            weight: 2,
            words: findImportantTerms(originalContent)
        },
        concept: {
            weight: 1.5,
            words: findConceptTerms(originalContent)
        },
        context: {
            weight: 1,
            words: findContextTerms(originalContent)
        }
    };

    // 키워드 매칭 점수 계산
    const keywordScore = calculateKeywordMatch(text, keywords);

    // 문장 구조 분석
    const structureScore = analyzeSentenceStructure(text);

    // 총점 계산 (100점 만점)
    const totalScore = (keywordScore + structureScore) / 2;

    // 누락된 키워드 찾기
    const missingKeywords = findMissingKeywords(text, keywords);

    // 개선 제안 생성
    const suggestions = generateSuggestions(totalScore, keywordScore, structureScore, missingKeywords);

    return {
        score: Math.round(totalScore),
        keywordScore: Math.round(keywordScore),
        structureScore: Math.round(structureScore),
        missingKeywords,
        suggestions
    };
};

const analyzeSentenceStructure = (text) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    let score = 0;

    // 문장 구조 체크
    if (checkTopicSentence(sentences)) score += 25;
    if (checkSupportingSentences(sentences)) score += 25;
    if (checkConclusion(sentences)) score += 25;
    if (checkTransitions(sentences)) score += 25;

    return score;
};

const findImportantTerms = (content) => {
    const words = content.split(/\s+/);
    const importantTerms = new Set();

    // 중요 패턴 주변의 단어 추출
    IMPORTANT_PATTERNS.forEach(pattern => {
        const regex = new RegExp(`[^.]*${pattern}[^.]*\\.`, 'g');
        const matches = content.match(regex) || [];
        matches.forEach(sentence => {
            const terms = sentence.split(/\s+/);
            terms.forEach(term => {
                if (term.length > 1 && !IMPORTANT_PATTERNS.includes(term)) {
                    importantTerms.add(term);
                }
            });
        });
    });

    return Array.from(importantTerms);
};

const findConceptTerms = (content) => {
    const conceptTerms = new Set();

    // 개념 패턴 주변의 단어 추출
    CONCEPT_PATTERNS.forEach(pattern => {
        const regex = new RegExp(`[^.]*${pattern}[^.]*\\.`, 'g');
        const matches = content.match(regex) || [];
        matches.forEach(sentence => {
            const terms = sentence.split(/\s+/);
            terms.forEach(term => {
                if (term.length > 1 && !CONCEPT_PATTERNS.includes(term)) {
                    conceptTerms.add(term);
                }
            });
        });
    });

    return Array.from(conceptTerms);
};

const findContextTerms = (content) => {
    // 문장을 분석하여 자주 등장하는 명사 추출
    const words = content.split(/\s+/);
    const wordCount = {};

    words.forEach(word => {
        if (word.length > 1) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });

    // 빈도수 기반으로 상위 키워드 선택
    return Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word);
};

const calculateKeywordMatch = (text, keywords) => {
    let score = 0;
    let maxScore = 0;

    // 카테고리별 키워드 매칭 점수 계산
    Object.entries(keywords).forEach(([category, data]) => {
        const { weight, words } = data;
        const maxCategoryScore = words.length * weight;
        maxScore += maxCategoryScore;

        words.forEach(word => {
            if (text.toLowerCase().includes(word.toLowerCase())) {
                score += weight;
            }
        });
    });

    // 100점 만점으로 변환
    return (score / maxScore) * 100;
};

const checkTopicSentence = (sentences) => {
    if (sentences.length === 0) return false;
    const firstSentence = sentences[0].toLowerCase();

    // 주제문의 특징을 확인
    return IMPORTANT_PATTERNS.some(pattern =>
        firstSentence.includes(pattern.toLowerCase())
    );
};

const checkSupportingSentences = (sentences) => {
    if (sentences.length < 2) return false;

    // 뒷받침 문장의 특징을 확인
    const hasExample = sentences.some(sentence =>
        sentence.includes('예를 들어') ||
        sentence.includes('예시') ||
        sentence.includes('사례')
    );

    const hasExplanation = sentences.some(sentence =>
        sentence.includes('때문에') ||
        sentence.includes('따라서') ||
        sentence.includes('그러므로')
    );

    return hasExample || hasExplanation;
};

const checkConclusion = (sentences) => {
    if (sentences.length < 2) return false;
    const lastSentence = sentences[sentences.length - 1].toLowerCase();

    // 결론 문장의 특징을 확인
    return [
        '따라서',
        '결론적으로',
        '요약하면',
        '정리하면',
        '결과적으로'
    ].some(pattern => lastSentence.includes(pattern));
};

const checkTransitions = (sentences) => {
    if (sentences.length < 3) return false;

    // 전환어 확인
    const transitionWords = [
        '그러나',
        '하지만',
        '또한',
        '게다가',
        '반면',
        '예를 들어',
        '특히',
        '결과적으로'
    ];

    let hasTransitions = false;
    for (let i = 1; i < sentences.length; i++) {
        if (transitionWords.some(word => sentences[i].includes(word))) {
            hasTransitions = true;
            break;
        }
    }

    return hasTransitions;
};

const findMissingKeywords = (text, keywords) => {
    const missing = [];
    const lowerText = text.toLowerCase();

    Object.entries(keywords).forEach(([category, data]) => {
        const { words } = data;
        words.forEach(word => {
            if (!lowerText.includes(word.toLowerCase())) {
                missing.push(word);
            }
        });
    });

    return missing;
};

const generateSuggestions = (totalScore, keywordScore, structureScore, missingKeywords) => {
    const suggestions = [];

    if (keywordScore < 70) {
        if (missingKeywords.length > 0) {
            suggestions.push(`다음 키워드들을 포함시켜보세요: ${missingKeywords.slice(0, 3).join(', ')}`);
        }
        suggestions.push('중요 개념과 키워드를 더 활용해보세요.');
    }

    if (structureScore < 70) {
        suggestions.push('문장 구조를 더 체계적으로 구성해보세요. (예: 주제문 - 뒷받침 문장 - 결론)');
        suggestions.push('전환어를 사용하여 문장 간 연결을 자연스럽게 만드세요.');
    }

    if (suggestions.length === 0 && totalScore < 90) {
        suggestions.push('전반적으로 잘 작성되었습니다. 더 구체적인 예시를 추가하면 좋을 것 같습니다.');
    }

    return suggestions;
};
