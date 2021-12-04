import React from "react";
import styled from "styled-components";
import { useFont } from "../helpers/useFont";
import { FontButton } from "./fontButton";

const FontContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FontControl = ({ changeFont }) => {
  const { fonts } = useFont();
  return (
    <FontContainer>
      {Object.keys(fonts.data).map((font) => (
        <FontButton
          changeFont={changeFont}
          font={fonts.data[font]}
          key={fonts.data[font].name}
        />
      ))}
    </FontContainer>
  );
};
