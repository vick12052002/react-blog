import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context';
import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
const Container = styled.div`
  min-height: calc(100vh - 90px - 61px);
`;
function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
