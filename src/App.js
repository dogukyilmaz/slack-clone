import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import Landing from "./components/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./components/Spinner";
import firebase from "./firebase";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { setUser, clearUser } from "./redux/actions";

import "./App.css";

const Root = ({ history }) => {
  const { isLoading } = store.getState().user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(setUser(user));
        history.push("/");
      } else {
        store.dispatch(clearUser());
        history.push("/login");
      }
    });
  }, [history]);

  return isLoading ? (
    <Spinner loadingMessage="Loading Chat..." size="massive" />
  ) : (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>
  );
};

export default App;
