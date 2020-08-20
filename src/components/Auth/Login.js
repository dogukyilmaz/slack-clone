import React, { useState } from "react";
import firebase from "../../firebase";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    if (!email || !password) {
      setError("Email and password are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isFormValid()) {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log(user);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="teal" textAlign="center">
          <Icon name="sign in" color="teal" />
          Login to Slacklone
        </Header>
        <Message color="red" hidden={!error}>
          {error}
        </Message>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              className={error && !email ? "error" : ""}
              name="email"
              value={email}
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              className={error && !password ? "error" : ""}
              name="password"
              value={password}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className={loading ? "loading" : ""}
              color="teal"
              fluid
              size="large"
              disabled={loading}
            >
              Submit
            </Button>
          </Segment>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
