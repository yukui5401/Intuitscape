/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import SubtopicPage from './SubtopicPage';
import GraphPage from './GraphPage';
import Loadingscreen from './Loadingscreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="SubtopicPage" element={<SubtopicPage />} />
        <Route path="Loadingscreen" element={<Loadingscreen />} />
        <Route path="GraphPage" element={<GraphPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
