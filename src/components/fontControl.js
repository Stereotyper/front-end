import React from "react";
import styled from "styled-components";
import { useFont } from "../helpers/useFont";
import { FontButton } from "./fontButton";

const FontContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 500px;
`;

export const FontControl = ({ changeFont, show }) => {
  const { fonts } = useFont();
  return (
    <FontContainer className={show}>
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
