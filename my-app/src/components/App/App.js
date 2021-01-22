import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { AuthContext, ThemeMode } from '../../context';
import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import AboutPage from '../../pages/AboutPage';

import RegisterPage from '../../pages/RegisterPage';
import AddPostPage from '../../pages/AddPostPage';
import PostPage from '../../pages/PostPage';
import AllPostsPage from '../../pages/AllPostsPage';

import Themes from '../../style/Themes';

const Container = styled.div`
  min-height: calc(100vh - 90px - 61px);
`;

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <ThemeMode.Provider value={{setMode}}>
      <ThemeProvider theme={mode? Themes.secondary:Themes.primary}>
        <AuthContext.Provider value={{ user, setUser }}>
          <Router>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/about">
                  <AboutPage />
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Route exact path="/register">
                  <RegisterPage />
                </Route>
                <Route exact path="/posts/:id">
                  <PostPage />
                </Route>
                <Route exact path="/add-post">
                  <AddPostPage />
                </Route>
                <Route exact path="/all-posts">
                  <AllPostsPage />
                </Route>
              </Switch>
            </Container>
            <Footer />
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </ThemeMode.Provider>
  );
}

export default App;
