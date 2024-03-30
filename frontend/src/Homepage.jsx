import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './App.css'

const Homepage = () => {

  const [inputContent, changeInputContent] = useState(" ");

  const enteredPrompt = () => {
    axios.post("http://localhost:5173/create_subtopics}", {topic: inputContent})
      .then((response) => {
        changeInputContent(" ");
      })
        .catch((error) => {console.error("Error: ", error)});
  }

  return (
    <>
      <h1 className="typewriter">
        <p className="typed">
          <div className='gradient-text-container'>
            <div className="gradient-text">Welcome to</div>
            <p className="gradient-text2">intuitscape</p>
            <p className="gradient-text">
              . We make learning intuitive and easy.
            </p>
          </div>
        </p>
      </h1>
      <div className="shadow-effect">
        <img src="logo.png" alt="Logo" />
      </div>

      <div className="inputContainer">
          <label>Enter Prompt: </label>
          <input type='text' value={inputContent} onChange={(event) => changeInputContent(event.target.value)}/>
          <button className='enterPromptButton' onClick={enteredPrompt}>
             <Link to="/SubtopicPage">Enter</Link>
          </button>
      </div>

    </>
  )
}

export default Homepage
