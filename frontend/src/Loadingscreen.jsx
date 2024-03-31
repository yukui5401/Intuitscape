/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
import axios from "axios";
import { Link } from "react-router-dom";

const Loadingscreen = () => {
  const location = useLocation();
  const topic = location.state?.topic || "Placeholder Topic";
  const { educationLevel } = {
    educationLevel: location.state.educationLevel,
  } || { educationLevel: "" };
  const { levelOfDetail } = { levelOfDetail: location.state.levelOfDetail } || {
    levelOfDetail: "",
  };

  const [titles, setTitles] = useState(location.state.focus);
  const [explanation, setExplanation] = useState([]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/create_presentation", {
        topic: topic,
        educationLevel: educationLevel,
        focus: titles,
        levelOfDetail: levelOfDetail,
      })
      .then((response) => {
        setExplanation(response.data.explanations);

        // setTitles(response.content.title);
        // setExplanation(response.content.explanation);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [educationLevel, levelOfDetail, titles, topic]);

  if (explanation.length > 0) {
    return (
      <Link
        to={{ pathname: "/GraphPage" }}
        state={{
          topic: topic,
          focus: titles,
          explanations: explanation
        }}
      >
        <button>View Graph</button>
      </Link>
    );
  }

  return <h1>Loading...</h1>;
};

export default Loadingscreen;
