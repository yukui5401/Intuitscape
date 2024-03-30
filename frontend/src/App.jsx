import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import SubtopicPage from './SubtopicPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}>
          <Route path="SubtopicPage" element={<SubtopicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
