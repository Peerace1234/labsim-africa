import { useState } from 'react';
import { quizQuestions } from '../constants/mockData';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const totalScore =
    Object.keys(selectedAnswers).length > 0
      ? (score / quizQuestions.length) * 100
      : 0;

  const handleAnswerClick = (optionIndex) => {
    if (selectedAnswers[currentQuestion] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));

    if (optionIndex === question.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setQuizComplete(false);
  };

  const isPassed = totalScore >= 80;

  if (quizComplete) {
    return (
      <div className="page quiz-page">
        <div className="results-container">
          <div className={`results-card ${isPassed ? 'pass' : 'fail'}`}>
            <div className="results-emoji">{isPassed ? '✓' : '✗'}</div>
            <h1>{isPassed ? 'Well Done!' : 'Try Again'}</h1>
            <div className="score-display">
              <div className="score-value">{totalScore.toFixed(0)}%</div>
              <div className="score-text">
                {score} out of {quizQuestions.length} correct
              </div>
            </div>

            <div className="results-feedback">
              {isPassed ? (
                <>
                  <p>
                    Excellent understanding of digital logic concepts! You're ready to tackle more
                    complex lab modules.
                  </p>
                  <button className="unlock-btn">🎓 Unlock Next Module</button>
                </>
              ) : (
                <>
                  <p>Review the concepts and try again. You're close!</p>
                  <button className="review-btn">📚 Review Topics</button>
                </>
              )}
            </div>

            <button className="retake-btn" onClick={handleRetake}>
              ↻ Retake Quiz
            </button>
          </div>

          <div className="answer-review">
            <h2>Answer Review</h2>
            {quizQuestions.map((q, idx) => {
              const isCorrect = selectedAnswers[idx] === q.correct;
              return (
                <div key={idx} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-number">Q{idx + 1}</div>
                  <div className="review-content">
                    <p className="review-question">{q.question}</p>
                    <p className="review-answer">
                      Your answer: <strong>{q.options[selectedAnswers[idx]]}</strong>
                      {!isCorrect && <span> (Correct: {q.options[q.correct]})</span>}
                    </p>
                    <p className="review-explanation">{q.explanation}</p>
                  </div>
                  <div className="review-icon">{isCorrect ? '✓' : '✗'}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Digital Logic Quiz</h1>
          <p>EEE211 Style Assessment</p>
        </div>

        <div className="progress-section">
          <div className="progress-info">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{totalScore.toFixed(0)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="question-container">
          <h2>{question.question}</h2>

          <div className="options">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestion] === idx;
              const isCorrect = idx === question.correct;
              const showResult =
                selectedAnswers[currentQuestion] !== undefined;

              return (
                <button
                  key={idx}
                  className={`option-btn ${isSelected ? 'selected' : ''} ${
                    showResult
                      ? isCorrect
                        ? 'correct'
                        : isSelected
                          ? 'incorrect'
                          : ''
                      : ''
                  }`}
                  onClick={() => handleAnswerClick(idx)}
                  disabled={selectedAnswers[currentQuestion] !== undefined}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="option-text">{option}</span>
                  {showResult && isCorrect && <span className="option-icon">✓</span>}
                  {showResult && isSelected && !isCorrect && (
                    <span className="option-icon">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedAnswers[currentQuestion] !== undefined && (
            <div className="explanation-box">
              <h3>Explanation</h3>
              <p>{question.explanation}</p>
            </div>
          )}

          {selectedAnswers[currentQuestion] !== undefined && (
            <button className="next-btn" onClick={handleNextQuestion}>
              {currentQuestion === quizQuestions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
