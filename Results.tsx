import React from 'react';
import styled from 'styled-components';
import { SlackChannelType } from './data';

function getSlackToUrl(channelId: string): string {
  return 'https://qwiltteam.slack.com/app_redirect?channel=' + channelId;
}

const ChannelDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
`;
const TitleSpn = styled.div`
  width: 100vw;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: white;
`;

const ResultsDiv = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
`;

interface ResultsProps {
  isLoading?: boolean;
  slackChannels: SlackChannelType[];
}

export function Results(props: ResultsProps) {
  return (
    <ResultsDiv>
      <TitleSpn>
        {props.isLoading
          ? 'Loading ...'
          : props.slackChannels.length === 0
          ? "Didn't find a match."
          : "You're Done, here's the results:"}
      </TitleSpn>
      {props.slackChannels.map((channel) => (
        <ChannelDiv
          onClick={() => {
            if (channel.id) {
              window.open(getSlackToUrl(channel.id), '_blank');
            }
          }}
        >
          {channel.name}
          {channel.id ? 'Channel is Ready' : ' Channel not yet created'}
        </ChannelDiv>
      ))}
    </ResultsDiv>
  );
}
