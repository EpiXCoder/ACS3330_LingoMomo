import React from 'react';
import { useDispatch } from 'react-redux';
import { selectModule } from '../features/modules/modulesSlice';
import './ModuleSelector.css';

const ModuleSelector = ({ modules }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Lesson Modules</h1>
      <ul className='module-list'>
        {modules.map((module, index) => (
          <li key={module.id}>
            <button className='module-button' onClick={() => dispatch(selectModule(index))}>
              {module.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleSelector;
