import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modules: [], // This will hold our modules data
  currentModuleIndex: null,
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
};

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    selectModule: (state, action) => {
      state.currentModuleIndex = action.payload;
      state.currentQuestionIndex = 0; // Reset to first question
      state.score = 0; // Reset score
      state.answers = []; // Reset answers
    },
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload;
      const module = state.modules[state.currentModuleIndex];
      const question = module.questions.find(q => q.id === questionId);
      const isCorrect = question.answer === answer;

      state.answers.push({ questionId, isCorrect });
      if (isCorrect) state.score += 1;
    },
    navigateQuestion: (state, action) => {
      const { direction } = action.payload;
      if (direction === 'next') state.currentQuestionIndex += 1;
      else if (direction === 'prev') state.currentQuestionIndex -= 1;
    },
  },
});

export const { setModules, selectModule, answerQuestion, navigateQuestion } = modulesSlice.actions;

export default modulesSlice.reducer;
