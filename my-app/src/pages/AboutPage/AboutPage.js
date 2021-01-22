import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Button';
const Root = styled.div`
  margin: 0 auto;
`;
const Container = styled.div`
  max-width: 1080px;
  margin: 30px auto;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #222;
  padding: 20px 30px;
  flex-direction: column;
  text-decoration: none;
`;
const PostTitle = styled.h4`
  color: ${(props) => props.theme.background};
`;
const PostContent = styled.p`
  line-height: 2rem;
  font-size: 18px;
`;
const BackBtn = styled(Button)`
  text-align: center;
  position: relative;
  left: 50%;
  margin: 30px auto;
  transform: translate(-50%);
`;

export default function AboutPage() {
  const history = useHistory();
  function handleGoBack() {
    history.goBack();
  }
  return (
    <Root>
      <Container>
        <Wrapper>
          <PostTitle>關於我</PostTitle>
          <PostContent className="typing__style">
            嗨嗨大家，我叫阿里蓉，目前正在學習前端技術，這邊會紀錄我在第四期－程式導師實驗計畫的一些筆記與心得~
          </PostContent>
        </Wrapper>
      </Container>
      <BackBtn onClick={handleGoBack}>回上一頁</BackBtn>
    </Root>
  );
}
