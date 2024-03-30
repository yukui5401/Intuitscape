import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './App.css'

const Homepage = () => {

  const [topic, changeInputContent] = useState("");

  const [subtopics, changeSubtopics] = useState(["subtopic1", "subtopic2", "subtopic3"]);;

  const enteredPrompt = () => {
    axios.post("http://localhost:5173/create_subtopics}", {topic: topic})
      .then((response) => {
        console.log(response.subtopics);
        changeSubtopics(response.subtopics);
      })
        .catch((error) => {console.error("Error: ", error)});
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
          <input type='text' value={topic} onChange={(event) => changeInputContent(event.target.value)}/>
          <button className='enterPromptButton' onClick={enteredPrompt}>
             <Link to={{ pathname: "/SubtopicPage"}} state={{topic: topic, subtopics: subtopics}}>Enter</Link>
          </button>
      </div>

    </>
  )
}

export default Homepage
