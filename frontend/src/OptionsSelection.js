import React, { useEffect, useState } from 'react';

const OptionsSelection = ({ options, onSelect }) => {
    // displays an element for each option
    // then when clicked, calls onSelect with the option and deletes the element

    const [availableOptions, setAvailableOptions] = useState(options);

    useEffect(() => {
        setAvailableOptions(options);
    }, [options]);

    const handleSelect = (option) => {
        onSelect(option);
        setAvailableOptions(availableOptions.filter(o => o !== option));
    }

    return (
        <>
            <div className='flex flex-row flex-wrap m-2'>
                {availableOptions?.map(option => (
                    <div
                        key={option.id}
                        className='m-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition duration-300'
                        onClick={() => handleSelect(option)}
                    >
                        {option.card_value}
                    </div>
                ))}
            </div>
        </>
    );
}

export default OptionsSelection;
