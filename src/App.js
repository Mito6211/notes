import React, { useState, useEffect } from "react";

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
    localStorage.setItem(
      "allNotes",
      JSON.stringify([...formData.allNotes, formData.note])
    );
  };

  useEffect(() => {
    localStorage.setItem("note", formData.note);
  }, [formData.note]);

  return (
    <div>
      <div>
        <textarea
          placeholder="add a note here!"
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div>
        {formData.allNotes.map((note) => (
          <div>
            <p>{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
