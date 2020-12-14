import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../WebAPI';
import { Button } from '../../components/Button';
const Root = styled.div`
  margin: 0 auto;
`;
const Container = styled.div`
  max-width: 1080px;
  margin: 30px auto;
`;
const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #222;
  padding: 20px 30px;
  flex-direction: column;
  text-decoration: none;
`;
const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  flex-wrap: wrap;
  text-decoration: none;
  width: 100%;
`;
const PostTitle = styled.h4`
  color: ${(props) => props.theme.background};
`;
const PostDate = styled.p`
  color: ${(props) => props.theme.background};
  font-size: 16px;
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
const LoadingWrapper = styled.div`
  width: 100vw;
  background-color: #eeeeea9e;
  height: 80vh;
  padding:40px 0;
`;
const LoadingTitle = styled.h2`
  color: #aaa;
  font-weight: bold;
  text-align:center;
  
`;
const LoadingPage = () => {
  return (
    <LoadingWrapper>
      <LoadingTitle>Loading ...</LoadingTitle>
    </LoadingWrapper>
  );
};

function Post({ data }) {
  return (
    <PostWrapper>
      <PostInfo>
        <PostTitle>{data.title}</PostTitle>
        <PostDate>{new Date(data.createdAt).toLocaleString()}</PostDate>
      </PostInfo>
      <PostContent>{data.body}</PostContent>
    </PostWrapper>
  );
}

export default function PostPage() {
  const [post, setPost] = useState(null);
  const history = useHistory();
  let { id } = useParams();
  function handleGoback() {
    history.goBack();
  }

  useEffect(() => {
    getPost(id).then((post) => {
      setPost(post);
    });
  }, [setPost, id]);
  return (
    <Root>
      {post ? (
        <Container>
          <Post data={post} />
        </Container>
      ) : (
        <LoadingPage />
      )} 
      <BackBtn onClick={handleGoback}>回上一頁</BackBtn>
    </Root>
  );
}
