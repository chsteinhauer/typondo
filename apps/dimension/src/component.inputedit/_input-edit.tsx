import React, { useEffect, useState } from "react";

import * as styles from "./_input-edit.styles";

type InputEditProps = {
  value: string;
  editMode: boolean;
  onSave: (value: string) => void;
};
export const InputEdit = (props: InputEditProps) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => setEditMode(props.editMode), [props.editMode]);

  const handleSave = () => {
    props.onSave(inputValue);
  };

  return (
    <div>
      {editMode ? (
        <input
          className={styles.input_edit}
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
