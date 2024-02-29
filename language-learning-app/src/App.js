import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModuleSelector from './components/ModuleSelector';
import QuestionView from './components/QuestionView';
import { setModules } from './features/modules/modulesSlice';
import HeroBanner from './components/HeroBanner';

const App = () => {
  const dispatch = useDispatch();
  const { currentModuleIndex, modules } = useSelector((state) => state.modules);

  useEffect(() => {
    // Fetch modules data from server
    fetch('http://localhost:3001/api/lessons')
      .then(response => response.json())
      .then(data => dispatch(setModules(data.modules)))
      .catch(error => console.error("Failed to fetch modules:", error));
  }, [dispatch]);

  return (
    <div className="App">
       <HeroBanner />
      {currentModuleIndex === null ? (
        <ModuleSelector modules={modules} />
      ) : (
        <QuestionView />
      )}
    </div>
  );
};

export default App;


