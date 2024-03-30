import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [inputContent, changeInputContent] = useState("");

  const enteredPrompt = () => {
    axios.post("", {content: inputContent})
      .then((response) => {
        
      })
        .catch((error) => {console.error("Error: ", error)});
  }

  return (
    <>
      <h1 className="typewriter">
        <p className="typed">
          <p className="gradient-text">Welcome to</p>
          <p className="gradient-text2">intuitscape</p>
          <p className="gradient-text">
            . We make learning intuitive and easy.
          </p>
        </p>
      </h1>
      <div className="shadow-effect">
        <img src="logo.png" alt="Logo" />
      </div>

      <div className="inputContainer">
          <label>Enter Prompt: </label>
          <input type='text' value={inputContent} onChange={(event) => changeInputContent(event.target.value)}/>
          <button className='addButton' onClick={enteredPrompt}>Add</button>
      </div>

    </>
  )
}

export default App
