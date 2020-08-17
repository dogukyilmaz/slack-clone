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

const Register = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState(null);

  const { username, email, password, passwordConfirmation } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password);
      console.log(createdUser);
    } catch (err) {
      console.log(err);
      setError(null);
      setError(err.message);
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="blue" textAlign="center">
          <Icon name="puzzle piece" color="blue" />
          Register for Slacklone
        </Header>
        {error && <Message color="red">{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              value={username}
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="email"
              value={email}
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="email"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="password"
              value={password}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              value={passwordConfirmation}
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              onChange={handleChange}
            />
            <Button color="blue" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already has an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
