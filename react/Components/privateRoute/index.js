import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {useSelector} from 'react-redux';

import {selectToken} from 'Features/auth';

import Routes from 'App/constants/routes';

function PrivateRoute({ children, ...rest }) {
  const token = useSelector(selectToken);

  return (
    <Route
      {...rest}
      render={() =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.LOGIN,
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
