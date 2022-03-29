import React from "react";
import { TextField, Button } from "@mui/material";
import { Link, withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailOrUsername: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      // once authenticated, redirect to main page
      this.props.history.push("/");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e, isDemoUser) {
    e.preventDefault();

    const user = isDemoUser
      ? {
          emailOrUsername: "DemoUser",
          password: "123456",
        }
      : {
          emailOrUsername: this.state.emailOrUsername,
          password: this.state.password,
        };
    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
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
          <h1>Welcome back to WhatsGood!</h1>
          <form onSubmit={(e) => this.handleSubmit(e, false)}>
            <div className="signup-form">
              <TextField
                type="text"
                value={this.state.emailOrUsername}
                onChange={this.update("emailOrUsername")}
                label={
                  this.state.errors.emailOrUsername ||
                  this.state.errors.username
                    ? this.state.errors.emailOrUsername ||
                      this.state.errors.username
                    : "Email or Username"
                }
                variant="outlined"
                size="small"
                error={
                  this.state.errors.emailOrUsername ||
                  this.state.errors.username
                    ? true
                    : false
                }
              />
              <TextField
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                label={
                  this.state.errors.password
                    ? this.state.errors.password
                    : "Password"
                }
                variant="outlined"
                size="small"
                error={this.state.errors.password ? true : false}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "0.5em" }}
              >
                Log in
              </Button>
              {/* {this.renderErrors()} */}
            </div>
          </form>
          <div className="signup-form__demo-login">
            <div>
              <p>Or sign in as a </p>
              <Button
                onClick={(e) => this.handleSubmit(e, true)}
                variant="contained"
                sx={{ margin: "0.5em 0" }}
              >
                Demo User
              </Button>
            </div>
            <div>
              <p>Don't have an account?</p>
              <Link to="/signup">
                <Button variant="contained" sx={{ margin: "0.5em 0" }}>
                  Signup Instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
