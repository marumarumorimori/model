import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./stores/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "@/components/Toast";

import Login from "@/pages/Login";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/Articles/Detail";
import Users from "@/pages/Users";
import UserDetail from "@/pages/Users/Detail";
import MyPage from "@/pages/MyPage";
import Admins from "@/pages/Admins";
import AdminNew from "@/pages/Admins/New";
import AdminDetail from "@/pages/Admins/Detail";
import NotFound from "@/pages/NotFound";
import Main from "@/containers/Main";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Main>
              <Switch>
                <Route exact path="/" component={Articles} />
                <Route exact path="/articles/:id" component={ArticleDetail} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/users/:id" component={UserDetail} />
                <Route exact path="/my-page" component={MyPage} />
                <Route exact path="/admins" component={Admins} />
                <Route exact path="/admins/new" component={AdminNew} />
                <Route exact path="/admins/:id(\d+)" component={AdminDetail} />
                <Route exact component={NotFound} />
              </Switch>
            </Main>
          </Switch>
          <Toast />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
