import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const SubtopicPage = () => {
  const location = useLocation();
  const { topic: topic } = { topic: location.state.topic } || { topic: "" };

  const [generatedTopic, setGeneratedTopic] = useState("");
  const { imagePath: imagePath } = { imagePath: location.state.imageUrl } || {
    imagePath: "",
  };

  const [subtopics, setSubtopics] = useState([]);
  const [focus, setFocus] = useState([]);

  const [educationLevel, setEducationLevel] = useState("");
  const [levelOfDetail, setLevelOfDetail] = useState("");

  useEffect(() => {
    if (imagePath !== "") {
      // if an imagePath exist, then use it to generate the topic first before POST to backend
      axios
        .post("http://127.0.0.1:5000/image2topic", { imagePath: imagePath })
        .then((response) => {
          setGeneratedTopic(response.generated_topic);
        });
    }
    axios
      .post("http://127.0.0.1:5000/create_subtopics", {
        topic: imagePath !== "" ? generatedTopic : topic,
      })
      .then((response) => {
        console.log(response.data.subtopics);
        setSubtopics(response.data.subtopics);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [topic, generatedTopic, imagePath]);

  useEffect(() => {
    console.log(focus);
  });

  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value);
  };

  const handleCheckBoxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add its label to the state array
      setFocus([...focus, event.target.name]);
    } else {
      // If checkbox is unchecked, remove its label from the state array
      setFocus(focus.filter((item) => item !== name));
    }
  };

  const handleLevelOfDetailChange = (e) => {
    setLevelOfDetail(e.target.value);
  };

  if (subtopics.length > 0) {
    return (
      <>
        <h1>Topic Selected: {topic}</h1>

        <div>
          <select value={levelOfDetail} onChange={handleLevelOfDetailChange}>
            <option value="">Level of Detail</option>
            <option value="lowDetail">Low</option>
            <option value="mediumDetail">Medium</option>
            <option value="highDetail">High</option>
          </select>

          <select value={educationLevel} onChange={handleEducationLevelChange}>
            <option value="">Education level</option>
            <option value="juniorLevel">Junior Level</option>
            <option value="highSchoolLevel">High School Level</option>
            <option value="undergradLevel">Undergrad Level</option>
          </select>

          {subtopics.map((subtopic, index) => (
            <div key={index}>
              <label>
                <input
                  name={subtopic}
                  type="checkbox"
                  onChange={handleCheckBoxChange}
                  checked={focus.includes(subtopic)}
                />
                {subtopic}
              </label>
            </div>
          ))}
        </div>

        <button className="enterDropdownButton">
          <Link
            to={{ pathname: "/GraphPage" }}
            state={{
              topic: topic,
              educationLevel: educationLevel,
              focus: focus,
              levelOfDetail: levelOfDetail,
            }}
          >
            Generate
          </Link>
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default SubtopicPage;
