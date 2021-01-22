import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import styled from 'styled-components';
import 'quill/dist/quill.snow.css';
import { Button } from '../../components/Button';
import { addPost } from '../../WebAPI';
const Root = styled.div`
  margin: 0 auto;
`;
const Container = styled.div`
  max-width: 1080px;
  margin: 30px auto;
  font-size: 24px;
  position: relative;
`;

const WrapperInput = styled.label`
  margin-top: 20px;
  display: block;
  width: 100%;
  position: relative;
`;
const InputTitle = styled.h3`
  font-size: 0.8em;
  font-weight: bold;
`;
const InputStyle = styled.input`
  font-size: 0.8em;
  padding: 8px;
  border: 1px solid #797979;
  width: ${(props) => props.size};
  border-radius: 5px;
`;

const BackBtn = styled(Button)`
  text-align: center;
  position: relative;
  left: 50%;
  margin: 30px auto;
  transform: translate(-50%);
`;

const ErrorMessage = styled.h6`
  color: ${(props) => props.theme.errorText};
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 5%;
`;
const MemoTitle = memo(({ inputTitle }) => <InputTitle>{inputTitle}</InputTitle>);

export default function AddPostPage() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState(null);
  const [contentErrorMessage, setContentErrorMessage] = useState(null);

  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>請填入文章內容</h1>');

      quill.on('text-change', () => {
        setContentErrorMessage(null);
        const text = quill.getText();
        setContent(text);
        console.log(text);
      });
    }
  }, [quill]);
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setTitleErrorMessage(null);
    if (name === 'title') {
      setTitle(value);
    }
  };
  function handleGoBack() {
    history.goBack();
  }
  const handelSubmit = () => {
    if (!content && !title) {
      setTitleErrorMessage('請確實填寫標題');
      return setContentErrorMessage('請確實填寫內容');
    }
    if (!title) return setTitleErrorMessage('請確實填寫標題');
    if (!content) return setContentErrorMessage('請確實填寫內容');

    addPost(title, content).then((res) => {
      if (res.ok === 0) {
        console.log(res);
        return setTitleErrorMessage(res.message.toString());
      }
      handleGoBack();
    });
  };

  return (
    <Root>
      <Container>
        <WrapperInput>
          <MemoTitle inputTitle={'標題'} />
          {titleErrorMessage && <ErrorMessage>{titleErrorMessage}</ErrorMessage>}
          <InputStyle name={'title'} type={'text'} onChange={handleChangeValue} value={title} />
        </WrapperInput>
        <WrapperInput>
          <MemoTitle inputTitle={'內容'} />
          {contentErrorMessage && <ErrorMessage>{contentErrorMessage}</ErrorMessage>}
        </WrapperInput>
          <div style={{ height: 400 }}>
            <div ref={quillRef} />
          </div>
      </Container>
      <BackBtn onClick={handelSubmit}>送出</BackBtn>
    </Root>
  );
}
