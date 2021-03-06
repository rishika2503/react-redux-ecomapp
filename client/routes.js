/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Item/pages/ItemListPage/ItemListPage');
  require('./modules/Item/pages/ItemDetailPage/ItemDetailPage');
  require('./modules/Cart/pages/CartDisplayPage/CartDisplayPage');
  require('./modules/Order/pages/PlaceOrderPage/PlaceOrderPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Item/pages/ItemListPage/ItemListPage').default);
        });
      }}
    />
    <Route
      path="/items/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Item/pages/ItemDetailPage/ItemDetailPage').default);
        });
      }}
    />
  <Route
    path="/cart"
    getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('./modules/Cart/pages/CartDisplayPage/CartDisplayPage').default);
      });
    }}
  />
  <Route
    path="/login"
    getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('./modules/Auth/pages/LoginPage/LoginPage').default);
      });
    }}
  />
  <Route
    path="/register"
    getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('./modules/Auth/pages/RegisterPage/RegisterPage').default);
      });
    }}
  />
  <Route
    path="/placeorder"
    getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('./modules/Order/pages/PlaceOrderPage/PlaceOrderPage').default);
      });
    }}
  />
  <Route
    path="/ordersuccessful"
    getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('./modules/Order/pages/SuccessPage/SuccessPage').default);
      });
    }}
  />
</Route>
);
