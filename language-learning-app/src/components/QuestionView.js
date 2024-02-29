import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, navigateQuestion, selectModule } from '../features/modules/modulesSlice';
import './QuestionView.css';
import ScorePopup from './ScorePopup';

const QuestionView = () => {
  const dispatch = useDispatch();
  const { modules, currentModuleIndex, currentQuestionIndex, score, answers } = useSelector((state) => state.modules);
  const module = modules[currentModuleIndex];
  const question = module.questions[currentQuestionIndex];
  const isModuleCompleted = currentQuestionIndex === module.questions.length - 1;

  // State to manage feedback visibility
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRestart = () => {
    dispatch(selectModule(null)); 
  };

  const handleAnswer = (answer) => {
    dispatch(answerQuestion({ questionId: question.id, answer }));
    setShowFeedback(true); // Show feedback upon answering
  };

  // Hide feedback when moving to the next or previous question
  useEffect(() => {
    setShowFeedback(false);
  }, [currentQuestionIndex]);

  // Determine if the last answer was correct or not
  const lastAnswer = answers.length > 0 ? answers[answers.length - 1] : null;
  const feedback = lastAnswer ? (lastAnswer.isCorrect ? 'CORRECT!' : `WRONG! Correct answer: ${question.answer}`) : '';

  return (
    <div>
      <div className='home-container'>
        <p className='module-title'>{module.title} Module</p>
        <button className='home-button' onClick={handleRestart} >Home</button>
      </div>
      
      <div className="question-container">
        <h2>{question.question}</h2>
        {question.options.map((option, index) => (
          <button className="option-button" key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`feedback ${lastAnswer?.isCorrect ? 'correct' : 'wrong'}`}>
          {feedback}
        </div>
      )}
      <div>
        {/* <button disabled={currentQuestionIndex <= 0} onClick={() => dispatch(navigateQuestion({ direction: 'prev' }))}>Prev</button> */}
        <button className= 'next-button' disabled={currentQuestionIndex >= module.questions.length - 1} onClick={() => dispatch(navigateQuestion({ direction: 'next' }))}>Next Question</button>
      </div>
      <div className= 'score-board'>Score: {score}</div>
      {isModuleCompleted && (
        <ScorePopup 
          score={score} 
          totalQuestions={module.questions.length} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
};

export default QuestionView;

