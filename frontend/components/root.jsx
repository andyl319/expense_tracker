import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './app';
import React from 'react';
import {Provider} from 'react-redux';
import SessionContainer from './session/session_form_container';

const Root = ({store}) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };


  return (
    <Provider store={ store }>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
        <Route path="/" component={ App } >
          <Route path="login" component={ SessionContainer } onEnter={_redirectIfLoggedIn}/>
          <Route path="signup" component={ SessionContainer } onEnter={_redirectIfLoggedIn}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
