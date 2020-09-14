import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { getCurrentAuthenticatedUser } from "../util/auth";
import { Loader } from "semantic-ui-react";

class PrivateRoute extends Component {
  constructor(props) {
    console.log(props);
    super();
    this.state = { user: null, loading: true };
  }
  componentDidMount = async () => {
    getCurrentAuthenticatedUser()
      .then((user) => this.setState({ user, loading: false }))
      .catch((err) => this.setState({ loading: false }, console.log(err)));
  };
  render() {
    const { component: Page, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>
          !this.state.loading ? (
            this.state.user !== null ? (
              <Page {...props} user={this.state.user} />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          ) : (
            <Loader active size="massive" />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
