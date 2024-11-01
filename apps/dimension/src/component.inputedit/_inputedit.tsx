import React, { useState } from "react";

type InputEditProps = {
  value: string;
  editMode: boolean;
  onSave: (value: string) => void;
};
export const InputEdit = (props: InputEditProps) => {
  const [inputValue, setInputValue] = useState(props.value);

  const handleSave = () => {
    props.onSave(inputValue);
    //setEditMode(false);
  };

  return (
    <div>
      {props.editMode ? (
        <input
          type="text"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
        />
      ) : (
        <span>{props.value}</span>
      )}
    </div>
  );
};
