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
        <h1>Let's get you signed up!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <TextField
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              label="Email"
              variant="outlined"
            />
            <TextField
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              label="Username"
              variant="outlined"
            />
            <TextField
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              label="Password"
              variant="outlined"
            />
            <TextField
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              label="Confirm Password"
              variant="outlined"
            />
            {/* <input type="submit" value="Submit" /> */}
            <Button type="submit" variant="contained">Submit</Button>
            {this.renderErrors()}
          </div>
        </form>
        <p>or sign in as a </p>
        <Button variant="contained">Demo User</Button>
        <p>Already have an account?</p>
        <Link to="/login">
          <Button variant="contained">Login Instead</Button>
        </Link>
      </div>
    );
  }
}

export default withRouter(SignupForm1);
