
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import type { QuizQuestion } from '../types';

const QuizView: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

    const handleAnswerSelect = (answer: string) => {
        if (showFeedback) return;
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
        setShowFeedback(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setScore(0);
        setQuizFinished(false);
    };

    const getButtonClass = (answer: string) => {
        if (!showFeedback) {
            return selectedAnswer === answer
                ? 'bg-aura-accent text-white'
                : 'bg-aura-surface hover:bg-aura-primary';
        }
        if (answer === currentQuestion.correctAnswer) {
            return 'bg-green-500 text-white';
        }
        if (answer === selectedAnswer) {
            return 'bg-red-500 text-white';
        }
        return 'bg-aura-surface';
    };

    if (quizFinished) {
        const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        return (
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
                <p className="text-2xl text-aura-text-dim mb-6">You scored {score} out of {QUIZ_QUESTIONS.length} ({percentage}%)</p>
                <button onClick={handleRestart} className="px-8 py-3 bg-aura-secondary text-white font-bold rounded-lg hover:bg-red-500 transition-colors">
                    Restart Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">Aura Knowledge Quiz</h1>
            <p className="text-aura-text-dim mb-8">Test your understanding of the Aura language.</p>

            <div className="bg-aura-surface p-6 rounded-lg shadow-lg">
                <p className="text-sm text-aura-text-dim">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</p>
                <h2 className="text-2xl font-semibold text-white my-4">{currentQuestion.question}</h2>
                <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${getButtonClass(option)}`}
                            disabled={showFeedback}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {showFeedback && (
                    <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                        <h3 className="font-bold text-lg">{selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}</h3>
                        <p>{currentQuestion.explanation}</p>
                    </div>
                )}
                
                <div className="mt-6 text-right">
                    {showFeedback ? (
                         <button onClick={handleNext} className="px-8 py-3 bg-aura-accent text-white font-bold rounded-lg hover:bg-blue-500 transition-colors">
                            {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={!selectedAnswer} className="px-8 py-3 bg-aura-secondary text-white font-bold rounded-lg hover:bg-red-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizView;
