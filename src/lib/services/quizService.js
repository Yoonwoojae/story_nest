// src/lib/services/quizService.js
import { stripHtml } from '@/lib/utils/textUtils';

// 퀴즈 타입 정의
const QUIZ_TYPES = {
    MAIN_IDEA: 'mainIdea',
    KEY_TERMS: 'keyTerms',
    RELATIONSHIP: 'relationship',
    MULTIPLE_CHOICE: 'multipleChoice'
};

export const generateQuiz = (content) => {
    const plainText = stripHtml(content);
    const sentences = plainText.split(/[.!?]+/).filter(Boolean);

    const quiz = [
        generateMainIdeaQuestion(sentences),
        ...generateKeyTermsQuestions(plainText),
        generateRelationshipQuestion(),
        ...generateMultipleChoiceQuestions(plainText)
    ].filter(Boolean);

    return quiz;
};

const generateMainIdeaQuestion = (sentences) => {
    return {
        id: `q_${Date.now()}_main`,
        type: 'text',
        template: '이 단락의 주요 내용을 한 문장으로 요약하세요.',
        evaluator: (answer, content) => {
            const keyPoints = extractMainPoints(content);
            return evaluateMainIdeaAnswer(answer, keyPoints);
        }
    };
};

const generateKeyTermsQuestions = (content) => {
    const keyTerms = extractKeyTerms(content);

    if (keyTerms.length < 4) return []; // 충분한 키워드가 없으면 건너뛰기

    return [{
        id: `q_${Date.now()}_terms`,
        type: 'multiSelect',
        template: '다음 중 이 단락에서 설명하는 주요 개념을 모두 고르세요.',
        options: shuffleArray([...keyTerms, ...generateDistractors(keyTerms)]).slice(0, 6),
        correctAnswers: keyTerms,
        evaluator: (selected, correctAnswers) => {
            return evaluateMultiSelectAnswer(selected, correctAnswers);
        }
    }];
};

const generateRelationshipQuestion = () => {
    return {
        id: `q_${Date.now()}_rel`,
        type: 'text',
        template: '이 내용은 이전에 학습한 내용과 어떤 관계가 있나요? 구체적으로 설명해보세요.',
        evaluator: (answer) => {
            return evaluateRelationshipAnswer(answer);
        }
    };
};

const generateMultipleChoiceQuestions = (content) => {
    const sentences = content.split(/[.!?]+/).filter(Boolean);
    const questions = [];

    // 중요 문장 찾기
    const importantSentences = sentences.filter(sentence =>
        sentence.includes('중요') ||
        sentence.includes('핵심') ||
        sentence.includes('따라서')
    );

    importantSentences.forEach((sentence, index) => {
        const options = generateOptions(sentence, sentences);
        if (options.length >= 4) {
            questions.push({
                id: `q_${Date.now()}_mc_${index}`,
                type: 'multipleChoice',
                template: '다음 중 올바른 설명은?',
                options: shuffleArray(options).slice(0, 4),
                correctAnswer: options[0],
                evaluator: (selected, correct) => {
                    return evaluateMultipleChoiceAnswer(selected, correct);
                }
            });
        }
    });

    return questions.slice(0, 2); // 최대 2개의 객관식 문제만 반환
};

// Helper 함수들
const extractMainPoints = (content) => {
    const sentences = content.split(/[.!?]+/).filter(Boolean);
    return sentences.filter(sentence =>
        sentence.includes('중요') ||
        sentence.includes('핵심') ||
        sentence.includes('결론') ||
        sentence.includes('따라서')
    );
};

const extractKeyTerms = (content) => {
    const words = content.split(/\s+/);
    const termFrequency = {};

    words.forEach(word => {
        if (word.length > 1) {
            termFrequency[word] = (termFrequency[word] || 0) + 1;
        }
    });

    return Object.entries(termFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([word]) => word);
};

const generateDistractors = (correctTerms) => {
    // 실제로는 더 정교한 방식으로 오답을 생성해야 하지만,
    // 현재는 간단한 예시만 구현
    const commonDistractors = [
        '불필요한 개념',
        '관련없는 용어',
        '다른 주제',
        '잘못된 설명',
        '부적절한 예시'
    ];

    return commonDistractors.filter(d => !correctTerms.includes(d));
};

const generateOptions = (correctSentence, allSentences) => {
    const options = [correctSentence];

    // 다른 문장들 중에서 무작위로 선택
    const otherSentences = allSentences.filter(s => s !== correctSentence);
    const shuffled = shuffleArray(otherSentences);
    options.push(...shuffled.slice(0, 3));

    return options;
};

const evaluateMainIdeaAnswer = (answer, keyPoints) => {
    if (!answer.trim()) return { score: 0, feedback: '답변을 작성해주세요.' };

    let score = 0;
    const feedback = [];

    // 키포인트와의 유사도 검사
    keyPoints.forEach(point => {
        const words = point.toLowerCase().split(/\s+/);
        const answerWords = answer.toLowerCase().split(/\s+/);

        const commonWords = words.filter(word => answerWords.includes(word));
        score += (commonWords.length / words.length) * 100;
    });

    score = Math.min(100, score / keyPoints.length);

    if (score >= 80) {
        feedback.push('핵심 내용을 잘 이해하고 있습니다.');
    } else if (score >= 50) {
        feedback.push('주요 내용을 포함했지만, 더 구체적으로 설명할 수 있습니다.');
    } else {
        feedback.push('핵심 내용을 다시 한 번 확인해보세요.');
    }

    return { score, feedback: feedback.join(' ') };
};

const evaluateMultiSelectAnswer = (selected, correct) => {
    if (!selected || selected.length === 0) {
        return { score: 0, feedback: '답을 선택해주세요.' };
    }

    const correctCount = selected.filter(item => correct.includes(item)).length;
    const incorrectCount = selected.filter(item => !correct.includes(item)).length;

    const score = Math.max(0, (correctCount / correct.length * 100) - (incorrectCount * 20));

    let feedback = '';
    if (score === 100) {
        feedback = '모든 답을 정확하게 선택했습니다!';
    } else if (score >= 70) {
        feedback = '대부분의 답을 맞췄지만, 일부 답을 더 확인해보세요.';
    } else {
        feedback = '주요 개념들을 다시 한 번 검토해보세요.';
    }

    return { score, feedback };
};

const evaluateRelationshipAnswer = (answer) => {
    if (!answer.trim()) {
        return { score: 0, feedback: '답변을 작성해주세요.' };
    }

    const words = answer.split(/\s+/).length;
    let score = 0;
    const feedback = [];

    // 답변의 길이와 구체성 평가
    if (words >= 30) {
        score += 40;
        feedback.push('충분히 구체적으로 설명했습니다.');
    } else if (words >= 15) {
        score += 20;
        feedback.push('조금 더 자세히 설명하면 좋겠습니다.');
    } else {
        feedback.push('더 구체적인 설명이 필요합니다.');
    }

    // 관계성 표현 단어 확인
    const relationWords = ['관련', '연결', '비슷', '차이', '반면', '따라서'];
    const hasRelationWord = relationWords.some(word => answer.includes(word));
    if (hasRelationWord) {
        score += 30;
        feedback.push('내용 간의 관계를 잘 설명했습니다.');
    }

    // 예시 포함 여부
    if (answer.includes('예를 들어') || answer.includes('예시')) {
        score += 30;
        feedback.push('예시를 통해 이해를 높였습니다.');
    }

    return {
        score: Math.min(100, score),
        feedback: feedback.join(' ')
    };
};

const evaluateMultipleChoiceAnswer = (selected, correct) => {
    const score = selected === correct ? 100 : 0;
    const feedback = score === 100
        ? '정답입니다!'
        : '틀렸습니다. 다시 한 번 확인해보세요.';

    return { score, feedback };
};

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
