import React from "react";
import KeyboardButton from "./KeyboardButton";

const InstructionButton = (props) => {
  return (
    <KeyboardButton>
      <div>{props.children}</div>
    </KeyboardButton>
  );
};

export default InstructionButton;
