import React from "react";
import { Link, withRouter } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import "./signup_form1.css";

class SignupForm1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      // to be changed once done with login modol
      this.props.history.push("/login");
    }
    // debugger;
    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    // debugger;
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <div className="signup-form__content">
          <h1>Let's get you signed up!</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="signup-form">
              <TextField
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                label="Email"
                variant="outlined"
                size="small"
              />
              <TextField
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                label="Username"
                variant="outlined"
                size="small"
              />
              <TextField
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                label="Password"
                variant="outlined"
                size="small"
              />
              <TextField
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                label="Confirm Password"
                variant="outlined"
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "0.5em" }}
              >
                Submit
              </Button>
              {this.renderErrors()}
            </div>
          </form>
          <div className="signup-form__demo-login">
            <div>
              <p>Or sign in as a </p>
              <Button variant="contained" sx={{ margin: "0.5em 0" }}>
                Demo User
              </Button>
            </div>
            <div>
              <p>Already have an account?</p>
              <Link to="/login">
                <Button variant="contained" sx={{ margin: "0.5em 0" }}>
                  Login Instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm1);
