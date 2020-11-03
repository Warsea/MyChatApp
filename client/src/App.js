import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Join from './components/join/Join';
import Chat from './components/chat/Chat';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Join />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
