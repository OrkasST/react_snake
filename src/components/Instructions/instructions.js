import React from "react";
import InstructionButton from "./Button/InstructionButton";
import InstructionsWrapper from "./Instructions_style";

const Instructions = (props) => {
  console.log(props);
  return (
    <InstructionsWrapper>
      <InstructionButton>W</InstructionButton>
    </InstructionsWrapper>
  );
};

export default Instructions;
