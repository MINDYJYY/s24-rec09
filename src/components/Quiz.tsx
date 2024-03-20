import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

interface QuizState {
  quizCore: QuizCore
  selectedAnswer: string | null
}

const Quiz: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    quizCore: new QuizCore(),
    selectedAnswer: null,  // Initialize the selected answer.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    quizCore.answerQuestion(selectedAnswer === null ? '': selectedAnswer);
    quizCore.nextQuestion();
    setState((prevState) => ({ ...prevState, selectedAnswer: null }));
  } 

  const { quizCore, selectedAnswer } = state;

  if (!quizCore.getCurrentQuestion()) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{quizCore.getCurrentQuestion()?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {quizCore.getCurrentQuestion()?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;