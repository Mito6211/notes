import React, { useState, useEffect } from 'react';

import './App.css';

export default function App() {

    const [formData, setFormData] = useState({
        note: localStorage.getItem("note") || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    useEffect(() => {
        localStorage.setItem("note", formData.note)
    }, [formData.note])

    return (
        <div>
            <textarea
                placeholder="add a note here!"
                name="note"
                value={formData.note}
                onChange={handleChange}
            />
        </div>
    );
}