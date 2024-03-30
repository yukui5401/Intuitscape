import React, { useState } from 'react';

const SubtopicPage = () => {

    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = (e) => {
        setSelectedItem(e.target.value);
    };

    const enteredDropdown = () => {

    }

    return (
        <>
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