import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../../WebAPI';
const Root = styled.div`
  margin: 30px auto;
`;
const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;
const PostWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  padding: 0 30px;
  cursor: pointer;
  flex-wrap:wrap;
  text-decoration: none;
`;
const PostTitle = styled.h4`
  color: ${(props) => props.theme.background};
`;
const PostDate = styled.p`
  color: ${(props) => props.theme.background};
  font-size: 16px;
`;

function Post({ post, handleGetPostId }) {
  return (
    <PostWrapper data-id={post.id} to={`/posts/${post.id}`}>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostWrapper>
  );
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts(3, null).then((posts) => {
      setPosts(posts);
    });
  }, [setPosts]);
  return (
    <Root>
      <Container>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Container>
    </Root>
  );
}
