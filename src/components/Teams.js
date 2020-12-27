/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import style from "styled-components";

const TeamWrapper = style.div`
    grid-column: 1;
    grid-row: 1 / 4;
    background-color: #362234;
    color: #958993;
`;
const team = ({ id, letter }) => {
  <li key={`team-${id}`}>{letter}</li>;
};

export default ({ teams }) => (
  <TeamWrapper>
    <ul>{teams.map(team)}</ul>
  </TeamWrapper>
);
