import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { Suspense } from "react";
import { Loader } from "semantic-ui-react";
import PrivateRoute from "./PrivateRoute";
import ServerError from "./ServerError";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const ManageWorkspaces = React.lazy(() =>
  import("./workspaces/ManageWorkspaces")
);
const Workspace = React.lazy(() => import("./workspaces/Workspace"));

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<Loader active size="massive" />}>
          <Route
            exact
            path="/"
            render={() => <Redirect to={{ pathname: "/manage-workspaces" }} />}
          />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/server-error/:errorCode"
            component={ServerError}
          />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute
            exact
            path="/manage-workspaces"
            component={ManageWorkspaces}
          />
          <PrivateRoute
            exact
            path="/view-workspace/:id"
            component={Workspace}
          />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
