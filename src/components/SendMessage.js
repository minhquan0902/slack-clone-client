import React from "react";
import style from "styled-components";
import { Input } from "semantic-ui-react";

const SendMessageWrapper = style.div`
    grid-column: 3;
    grid-row: 3;
    margin: 20px;
`;

export default ({ channelName }) => {
  <SendMessageWrapper>
    <Input fluid placeholder={`Message # ${channelName}`} />
  </SendMessageWrapper>;
};
