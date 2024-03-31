/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './App.css'

const Homepage = () => {

  const [topic, changeInputContent] = useState("");

  
  return (
    <>
      <h1 className="typewriter">
        <p className="typed">
          <span className='gradient-text-container'>
            <span className="gradient-text">Welcome to </span>
            <span className="gradient-text2">intuitscape</span>
            <span className="gradient-text">
              . We make learning intuitive and easy.
            </span>
          </span>
        </p>
      </h1>
      <div className="shadow-effect">
        <img src="logo.png" alt="Logo" align="right"/>
        <h2>What is intuitscape?</h2>
        <p>
          We are an interactive platform designed to personalize learning content catered to <i>your needs</i>.
        <br></br>
        Using intuitscape, you can explore learning in a conceptually linked landscape.
        <br></br>
        By providing a topic and checking a few boxes, well be able to generate a personalized mindmap just for you.
        <br></br>
        <br></br>
        So, what are you waiting for?
        </p>
      </div>

      <div className="inputContainer">
          <label>Topic of interest: </label>
          <input type='text' value={topic} onChange={(event) => changeInputContent(event.target.value)}/>
          <div className="button-4">
            <button className='enterPromptButton'>
              <Link to={{ pathname: "/SubtopicPage"}} state={{topic: topic}}>Enter</Link>
            </button>
          </div>
      </div>

    </>
  )
}

export default Homepage
