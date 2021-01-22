import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../../WebAPI';
import Pagination from 'react-bootstrap/Pagination';
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
  padding: 20px 30px;
  cursor: pointer;
  flex-wrap: wrap;
  text-decoration: none;
`;
const PostTitle = styled.h4`
  color: ${(props) => props.theme.background};
`;
const PostDate = styled.p`
  color: ${(props) => props.theme.background};
  font-size: 16px;
`;
const PaginationContainer = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
`;
const PageControlBtn = styled.span`
  display:inline-block;
  height: 100%;
  color:#007bff;
  cursor:pointer;
  line-height:2.5em;
  padding:0 10px;
  &:hover{
    color:#00bbff;
  }
`

function Post({ post, handleGetPostId }) {
  return (
    <PostWrapper data-id={post.id} to={`/posts/${post.id}`}>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostWrapper>
  );
}
;
function newArray(start, end) {
  let array = [];
  for (let i = start; i <= end; i += 1) {
    array.push(i);
  }
  return array;
}

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [pagesList, setPagesList] = useState([]);
  const limit = 5;
  const [active, setActive] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts().then((post) => {
      const total = post.length;
      setTotalPages(Math.ceil(total / limit));
      setPagesList(newArray(1, Math.ceil(total / limit)));
    });
  }, []);

  useEffect(() => {
    getPosts(limit, page).then((posts) => {
      setPosts(posts);
    });
  }, [setPosts, page]);

  const handleGetPage = (pageId) => {
    setPage(pageId);
    setActive(pageId);
  };
  const handleSwitchPage = (type) => {
    if(type==='next'){
      setPage(page + 1);
      setActive(page + 1);
    }else{
      setPage(page - 1);
      setActive(page - 1);
    }
  };
  return (
    <Root>
      <Container>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Container>
      <PaginationContainer>
        <Pagination>
        {page!==1 &&
          <PageControlBtn onClick={()=>handleSwitchPage('back')}>上一頁</PageControlBtn>
          }
          {pagesList.map((num) => (
            <Pagination.Item key={num} active={num === active} onClick={() => handleGetPage(num)}>
              {num}
            </Pagination.Item>
          ))}
          {page!==totalPages &&
          <PageControlBtn onClick={()=>handleSwitchPage('next')}>下一頁</PageControlBtn>
          }
        </Pagination>
      </PaginationContainer>
    </Root>
  );
}
