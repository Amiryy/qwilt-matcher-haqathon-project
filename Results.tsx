import React from 'react';
import styled from 'styled-components';

function getSlackToUrl(channelId: string): string {
  return 'https://qwiltteam.slack.com/app_redirect?channel=' + channelId;
}

const TitleSpn = styled.div`
  width: 100vw;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: white;
`;

const ResultsDiv = styled.div``;

interface SlackChannel {
  id?: string;
  name: string;
}

interface ResultsProps {
  slackChannels: SlackChannel[];
}

export function Results(props: ResultsProps) {
  return (
    <ResultsDiv>
      <TitleSpn>You're Done, here's the results:</TitleSpn>
      {props.slackChannels.map((channel) => (
        <span
          onClick={() => {
            if (channel.id) {
              window.open(getSlackToUrl(channel.id), '_blank');
            }
          }}
        >
          {channel.name}
          {channel.id ? '' : ' Channel not yet created'}
        </span>
      ))}
    </ResultsDiv>
  );
}
