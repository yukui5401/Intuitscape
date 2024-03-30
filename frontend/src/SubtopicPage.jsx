import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SubtopicPage = () => {

    const location = useLocation();
    const { inputContent } = { inputContent: location.state.topic } || { inputContent: '' };
    const { subtopics } = { subtopics: location.state.subtopics } || { subtopics: [] };

    const [educationLevel, setEducationLevel] = useState('');
    const [focus, setFocus] = useState('');
    const [levelOfDetail, setLevelOfDetail] = useState('');

    const handleEducationLevelChange = (e) => {
        setEducationLevel(e.target.value);
    };

    const handleFocusChange = (e) => {
        setFocus(e.target.value);
    };

    const handleLevelOfDetailChange = (e) => {
        setLevelOfDetail(e.target.value);
    };

    const enteredDropdown = () => {
        axios.post("http://localhost:5173/create_presentation}", {topic: topic, educationLevel: educationLevel, focus: focus, levelOfDetail: levelOfDetail})
            .then((response) => {
                
            })
                .catch((error) => {console.error("Error: ", error)});
    }

    return (
        <>

            <h1>Topic Selected: {inputContent}</h1>

            <div>
                
                <select value={educationLevel} onChange={handleEducationLevelChange}>
                <option value="">Education level</option>
                <option value="juniorLevel">Junior Level</option>
                <option value="highSchoolLevel">High School Level</option>
                <option value="undergradLevel">Undergrad Level</option>
                </select>

                <select value={focus} onChange={handleFocusChange}>
                <option value="">Focus</option>
                {subtopics.map((subtopic, index) => {
                    return <option key={index} value={subtopic}>{subtopic}</option>
                })}
                </select>

                <select value={levelOfDetail} onChange={handleLevelOfDetailChange}>
                <option value="">Level of Detail</option>
                <option value="lowDetail">Low</option>
                <option value="mediumDetail">Medium</option>
                <option value="highDetail">High</option>
                </select>

            </div>

        <button className='enterDropdownButton' onClick={enteredDropdown}>Enter dropdown</button>
        </>
    );
}

export default SubtopicPage;