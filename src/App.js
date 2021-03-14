import React, { useState, useEffect } from "react";

import styles from "./App.module.css";

export default function App() {
    const [formData, setFormData] = useState({
        note: localStorage.getItem("note") || "",
        allNotes: JSON.parse(localStorage.getItem("allNotes")) || [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addNote = () => {
        setFormData((prevData) => ({
            ...prevData,
            note: "",
            allNotes: [...prevData.allNotes, formData.note],
        }));
        localStorage.setItem("allNotes", JSON.stringify([...formData.allNotes, formData.note]));

    };

    useEffect(() => {
        localStorage.setItem("note", formData.note);
    }, [formData.note]);

    return (
        <div className={styles.notesContainer}>
            <div className={styles.addNoteItems}>
                <textarea
                    className={styles.addNoteField}
                    placeholder="add a note here!"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                />
                <button className={styles.addNoteButton} onClick={addNote}>
                    Add Note
                </button>
            </div>
            <div>
                {formData.allNotes.map((note) =>
                    <div className={styles.allNotes}>
                        <p>{note}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
