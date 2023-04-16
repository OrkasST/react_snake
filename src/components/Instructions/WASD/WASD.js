import React from "react";
import InstructionButton from "./Button/InstructionButton";

const WASD = (props) => {
  return (
    <div>
      <div className="W">
        <InstructionButton>W</InstructionButton>
      </div>
      <div className="ASD">
        <InstructionButton>A</InstructionButton>
        <InstructionButton>S</InstructionButton>
        <InstructionButton>D</InstructionButton>
      </div>
    </div>
  );
};

export default WASD;
