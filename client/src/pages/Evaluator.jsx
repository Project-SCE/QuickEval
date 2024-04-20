import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Evaluator = () => {
    const [selectedSeries, setSelectedSeries] = useState(null);
    const history = useHistory();

    const handleButtonClick = (series) => {
        // Navigate to the "New" page with the selected series as a parameter
        history.push(`/new?series=${series}`);
    };

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex' }}>
            {/* Left Side: Display selected series */}
            <div style={{ flex: 1 }}>
                {/* Apply a CSS style to the <p> element */}
                <p style={{ fontSize: '24px' }}>{selectedSeries}</p>
            </div>

            {/* Right Side: Button to select series */}
            <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleButtonClick("Flat 1")}>
                    Evaluate Flat 1
                </button>
            </div>
        </div>
    );
}

export default Evaluator;
