/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './App.css'

const Homepage = () => {

  const [topic, changeTopic] = useState("");

  const [imagePath, setImageUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  
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
        <img src="logo.png" className="logo" alt="Logo" align="right"/>
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
          <input type='text' value={topic} onChange={(event) => changeTopic(event.target.value)}/>

          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePath && <img src={imagePath} className="inputImage" alt="Uploaded" />}
          </div>

          <div className="button-4">
            <button className='enterPromptButton'>
              <Link to={{ pathname: "/SubtopicPage"}} state={{topic: topic, imageUrl: imagePath}}>Enter</Link>
            </button>
          </div>
      </div>

    </>
  )
}

export default Homepage
