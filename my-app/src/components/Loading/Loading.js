import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100vw;
  background-color: #eeeeea9e;
  height: 80vh;
  padding: 40px 0;
`;
const LoadingTitle = styled.h2`
  color: #aaa;
  font-weight: bold;
  text-align: center;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <LoadingTitle>Loading ...</LoadingTitle>
    </LoadingWrapper>
  );
}
