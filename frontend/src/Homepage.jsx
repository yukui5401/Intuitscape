import React, { useState } from 'react';
import axios from 'axios';
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

  const [selectedItem, setSelectedItem] = useState('');
  
  const handleChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const enteredDropdown = () => {

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
          <button className='enterPromptButton' onClick={enteredPrompt}>Enter</button>
      </div>

      <div>
        <select value={selectedItem} onChange={handleChange}>
          <option value="">Select an item</option>
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>

        <select value={selectedItem} onChange={handleChange}>
          <option value="">Select an item</option>
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>

        <select value={selectedItem} onChange={handleChange}>
          <option value="">Select an item</option>
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>

      </div>

      <button className='enterDropdownButton' onClick={enteredDropdown}>Enter dropdown</button>

    </>
  )
}

export default Homepage
