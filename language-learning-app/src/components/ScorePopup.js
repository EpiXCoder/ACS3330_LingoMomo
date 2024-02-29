import React from 'react';
import './ScorePopup.css'; 

const ScorePopup = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="score-popup">
      <div className="score-popup-content">
        <h2>Module Completed!</h2>
        <p>Your score: {score} out of {totalQuestions}</p>
        <button className='score-popup-button' onClick={onRestart}>Start a New Module</button>
      </div>
    </div>
  );
};

export default ScorePopup;
