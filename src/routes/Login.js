/* eslint-disable react/prop-types */
import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import {
  Message,
  Form,
  Button,
  Input,
  Container,
  Header,
} from "semantic-ui-react";
import { gql, graphql } from "react-apollo";
class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: "",
      password: "",
      errors: {},
    });
  }
  // eslint-disable-next-line
  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });
    console.log(response);

    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("resetToken", refreshToken);
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        // err['passwordError'] = 'too long ...';
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError },
    } = this;

    const errorList = [];
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Input
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length !== 0 ? (
          <Message
            error
            header="There was some errors with your input"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));