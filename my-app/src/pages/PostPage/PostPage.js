import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../WebAPI';
import { Button } from '../../components/Button';
import Loading from '../../components/Loading';

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
  function handleGoBack() {
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
        <Loading />
      )} 
      <BackBtn onClick={handleGoBack}>回上一頁</BackBtn>
    </Root>
  );
}
