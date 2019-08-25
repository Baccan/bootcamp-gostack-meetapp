import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Details from '../pages/Meetups/Details';
import EditMeetup from '../pages/Meetups/Edit';

import Profile from '../pages/Profile';

import Page404 from '../pages/page404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/meetups/details" component={Details} isPrivate />
      <Route path="/meetups/edit" component={EditMeetup} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/" component={() => <Page404 />} />
    </Switch>
  );
}
