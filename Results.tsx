import React from 'react';
import styled from 'styled-components';
import { SlackChannelType } from './data';

function getSlackToUrl(channelId: string): string {
  return 'https://qwiltteam.slack.com/app_redirect?channel=' + channelId;
}

const ChannelDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content 1fr max-content;
  grid-gap: 1rem;
  justify-self: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 8px 10px 20px rgba(0,0,0,0.1);
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  max-width: 100vw;
  width: 50rem;
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
const ChannelMembersCount = styled.div`
  font-weight: 500;
`;
const ChannelNameSpn = styled.div`
  font-weight: 600;
`;
const ChannelStatus = styled.div`
  font-weight: 600;
  justify-self: end;
  width: max-content;
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
          <ChannelNameSpn>{channel.name}</ChannelNameSpn>
          <ChannelMembersCount>
            {channel.employees?.length} {'Members'}
          </ChannelMembersCount>
          <ChannelStatus>
            {channel.id
              ? 'Channel is Ready'
              : 'This channel will be created for you soon'}
          </ChannelStatus>
        </ChannelDiv>
      ))}
    </ResultsDiv>
  );
}
