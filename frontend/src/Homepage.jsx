/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

const Homepage = () => {
  const [topic, changeTopic] = useState("");

  const [imagePath, setImageUrl] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  return (
    <>
      <div className="top-section">
        <h1 className="big-heading">
          <span className="gradient-text">Welcome to </span>
          <span className="gradient-text2">intuitscape.</span>
        </h1>
        <h1 className="typewriter">
          <p className="typed">
            <span className="gradient-text-container">
              <br />
              <span className="gradient-text">
                Your intuitive landscape for learning.
              </span>
            </span>
          </p>
        </h1>

        <h2>What do you want to learn about today?</h2>

        <div className="input-area">
          <div className="input-container">
            <input
              placeholder="Enter a topic"
              type="text"
              value={topic}
              onChange={(event) => changeTopic(event.target.value)}
            />

            <Link
              to={{ pathname: "/SubtopicPage" }}
              state={{ topic: topic, imageUrl: imagePath }}
            >
              <button className="enterPromptButton">Generate subtopics</button>
            </Link>
          </div>

          <div>
            <h2>OR</h2>
          </div>

          <div>
            <h3>Select an image</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePath && (
              <img src={imagePath} className="inputImage" alt="Uploaded" />
            )}
          </div>
        </div>
      </div>

      <div className="shadow-effect">
        <img src="logo.png" className="logo" alt="Logo" align="right" />
        <h2>What is intuitscape?</h2>
        <p>
          We are an interactive platform designed to personalize learning
          content catered to <i>your needs</i>.<br></br>
          Using intuitscape, you can explore learning in a conceptually linked
          landscape.
          <br></br>
          By providing a topic and checking a few boxes, well be able to
          generate a personalized mindmap just for you.
          <br></br>
          <br></br>
          So, what are you waiting for?
        </p>
        <h2>Why we created intuitscape</h2>
        <p>
          As students, we constantly found ourselves scouring the internet for
          the right resources to sort out our confusion and stress. Each time,
          we would come to explanations that only made us hunt for more answers.
          It became clear the value of having an intuitive, reliable process to
          finding fruitful answers for our personal needs. That is where
          intuitscape comes in, providing the perfect closure to our knowledge
          quest.
        </p>
      </div>
    </>
  );
};

export default Homepage;
