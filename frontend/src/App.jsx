import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import SubtopicPage from './SubtopicPage';
import GraphPage from './GraphPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="SubtopicPage" element={<SubtopicPage />} />
        <Route path="GraphPage" element={<GraphPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
