import React, { useState } from 'react';

const UsernameInput = () => {
    const [username, setUsername] = useState('');

    const handleAdd = () => {
        if (username.trim()) {
            console.log(`Username added: ${username}`);
            setUsername('');
        } else {
            alert('Please enter a username.');
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 bg-purple-800 p-6 rounded-lg shadow-lg mt-12   max-w-full h-full">
            <input
                type="text"
                className="flex-1 p-2 rounded-md text-white bg-purple-600 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button
                className="px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                onClick={handleAdd}
            >
                Add
            </button>
        </div>
    );
};

export default UsernameInput;
