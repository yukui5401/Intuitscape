import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SubtopicPage = () => {

    const location = useLocation();
    const { inputContent } = { inputContent: location.state } || { inputContent: '' };

    useEffect(() => {
        console.log("Component rendered");
        console.log(location);
    });

    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = (e) => {
        setSelectedItem(e.target.value);
    };

    const enteredDropdown = () => {

    }

    return (
        <>

            <h1>Topic Selected: {inputContent}</h1>

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
    );
}

export default SubtopicPage;