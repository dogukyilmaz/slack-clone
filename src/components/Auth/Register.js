import React, { useState } from "react";
import firebase from "../../firebase";
import md5 from "md5";
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
  // TODO: refactor form validation and form error ui
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usersRef] = useState(firebase.database().ref("users"));

  const { username, email, password, passwordConfirmation } = state;

  const isFormValid = () => {
    if (!isFormFilled()) {
      setError("Fill all credentials...");
      return false;
    } else if (!isPasswordValid()) {
      setError("Passwords is not matched or must be between 6-15 characters!");
      return false;
    } else return true;
  };

  const isFormFilled = () => {
    return (
      username.length &&
      email.length &&
      password.length &&
      passwordConfirmation.length
    );
  };

  const isPasswordValid = () => {
    return (
      password.length > 5 &&
      password.length < 15 &&
      password === passwordConfirmation
    );
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isFormValid()) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(state.email, state.password);
        await createdUser.user.updateProfile({
          displayName: username,
          photoURL: `http://gravatar.com/avatar/${md5(
            createdUser.user.email
          )}?=identicon`,
        });
        await saveUser(createdUser);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
    setLoading(false);
  };

  // firestore DB
  const saveUser = async ({ user }) => {
    return await usersRef.child(user.uid).set({
      name: user.displayName,
      avatar: user.photoURL,
    });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="blue" textAlign="center">
          <Icon name="signup" color="blue" />
          Register for Slacklone
        </Header>
        <Message color="red" hidden={!error}>
          {error}
        </Message>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              className={error && error.includes("all") ? "error" : ""}
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
              className={
                error && (error.includes("email") || error.includes("all"))
                  ? "error"
                  : ""
              }
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
              className={
                error &&
                (error.toLowerCase().includes("password") ||
                  error.includes("all"))
                  ? "error"
                  : ""
              }
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
              className={
                error &&
                (error.toLowerCase().includes("password") ||
                  error.includes("all"))
                  ? "error"
                  : ""
              }
              name="passwordConfirmation"
              value={passwordConfirmation}
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              onChange={handleChange}
            />
            <Button
              className={loading ? "loading" : ""}
              color="blue"
              fluid
              size="large"
              disabled={loading}
            >
              Submit
            </Button>
          </Segment>
          <span>
            Already has an account? <Link to="/login">Login</Link>
          </span>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
