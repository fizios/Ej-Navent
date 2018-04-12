import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './containers/Main';

const routes = (props) => {
  return (
    <Switch>
      <Route
        path={`/`}
        exact
        render={(props)=>{
          return <Main {...props}/>
        }}
      />
    </Switch>
  )
};

export default routes;
