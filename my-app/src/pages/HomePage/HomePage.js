import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../../WebAPI';
const Root = styled.div`
  margin: 0 auto;
  padding: 20px 0;
`;
const Container = styled.div`
  max-width: 720px;
  margin: 20px auto;
`;
const PostWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  padding: 20px 30px;
  cursor: pointer;
  flex-wrap: wrap;
  transition:background-color 0.4s ease-in;
  &:hover{
    text-decoration: none;
    background-color:${props=>props.theme.navbarHover}aa;;
  }
`;
const PostTitle = styled.h4`
  color: ${(props) => props.theme.background};
  transition:color 0.2s ease-in;
  &:hover{
    text-decoration: none;
    color:${props=>props.theme.textHover};
  }
`;
const PostDate = styled.p`
  color: ${(props) => props.theme.background};
  font-size: 16px;
`;

function Post({ post }) {
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
    getPosts(7, 1).then((posts) => {
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
