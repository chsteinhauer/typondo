import React, { useState } from "react";

export const InputEdit = ({ value, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
        />
      ) : (
        <span onClick={() => setEditMode(true)}>{value}</span>
      )}
    </div>
  );
};
