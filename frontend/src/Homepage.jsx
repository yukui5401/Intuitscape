import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './App.css'

const Homepage = () => {

  const [inputContent, changeInputContent] = useState("");

  const enteredPrompt = () => {
    // axios.post("http://localhost:5173/create_subtopics}", {topic: inputContent})
    //   .then((response) => {

    //   })
    //     .catch((error) => {console.error("Error: ", error)});
    console.log(inputContent);
  }

  return (
    <>
      <h1 className="typewriter">
        <div className="typed">
          <div className='gradient-text-container'>
            <div className="gradient-text">Welcome to</div>
            <div className="gradient-text2">intuitscape</div>
            <div className="gradient-text">
              . We make learning intuitive and easy.
            </div>
          </div>
        </div>
      </h1>
      <div className="shadow-effect">
        <img src="logo.png" alt="Logo" />
      </div>

      <div className="inputContainer">
          <label>Enter Prompt: </label>
          <input type='text' value={inputContent} onChange={(event) => changeInputContent(event.target.value)}/>
          <button className='enterPromptButton' onClick={enteredPrompt}>
            {console.log(inputContent)}
             <Link to={{ pathname: "/SubtopicPage"}} state={inputContent}>Enter</Link>
          </button>
      </div>

    </>
  )
}

export default Homepage
