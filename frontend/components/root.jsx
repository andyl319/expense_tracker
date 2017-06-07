import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './app';
import React from 'react';
import {Provider} from 'react-redux';
import {requestAllTracks, requestTrack} from '../actions/track_actions';
import SessionContainer from './session/session_container';
import TrackDisplayContainer from './track/track_display_container';
import TrackIndexContainer from './track/track_index_container';
import TrackShowContainer from './track/track_show_container';
import TrackCommentContainer from './track_comments/track_comments_container';

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
          <IndexRoute component={ TrackDisplayContainer } />
          <Route path="all" component={ TrackIndexContainer } />
          <Route path="tracks/:id" component={ TrackShowContainer } >
            <IndexRoute component={ TrackCommentContainer } />
          </Route>
          <Route path="login" component={ SessionContainer } onEnter={_redirectIfLoggedIn}/>
          <Route path="signup" component={ SessionContainer } onEnter={_redirectIfLoggedIn}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
