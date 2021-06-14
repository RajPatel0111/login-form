import { Component } from "react";
import axios from "axios";
import "./Style.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    // Setting up the initial Props
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      wrongEmail: false,
      wrongPassword: false,
    };
  }

  // For Email Validation
  validateEmail = (email) => {
    let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    // Testing Email according to the regex
    if (!emailRegex.test(email)) {
      this.setState({ wrongEmail: "Please Enter a Valid Email." });
    }

    // Returning the Email Validation Value
    return emailRegex.test(email);
  };

  // For Password Validation
  validatePassword = (password) => {
    // Regex for UpperCase
    var upperCaseLetters = /[A-Z]/g;

    // Regex for LowerCase
    var lowerCaseLetters = /[a-z]/g;

    // Regex for Numbers
    var numbers = /[0-9]/g;

    // Checking if the password is 8 characters long or not and printing the error according to that
    if (password.length < 8) {
      this.setState({
        wrongPassword: "Password Should be minimum 8 character long.",
      });
      return false;
    }

    // Checking if the password contains at least one Uppercase Character
    else if (!upperCaseLetters.test(password)) {
      this.setState({
        wrongPassword: "Password must contain at least one UpperCase Charater.",
      });
      return false;
    }

    // Checking if the password constains at least one lowercase Character
    else if (!lowerCaseLetters.test(password)) {
      this.setState({
        wrongPassword: "Password must contain at least one LowerCase Charater.",
      });
      return false;
    }

    // Checking if the password constains at least one numeric character
    else if (!numbers.test(password)) {
      this.setState({
        wrongPassword: "Password must contain at least one Number.",
      });
      return false;
    }
    return true;
  };

  // To handle the error once submit button clicked
  handleSubmit = (event) => {
    event.preventDefault();

    //  Validating Email and Password
    if (
      !this.validateEmail(this.state.email) ||
      !this.validatePassword(this.state.password)
    ) {
      return;
    } 
    
    // Sending Email and Password to server
    else {
      axios
        .post("http://localhost:8000/login", {
          email: this.state.email,
          password: this.state.password,
          rememberMe: this.state.rememberMe,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // handling the onChange Event for the Input text boxes
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // handling the onChange Event for the checkboxe
  changeCheckBox = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  // rendering the form
  render() {
    return (
      <div className="addBorder">
        <h1 className="heading">Sign in</h1>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
        >
          <label>
            <p className="divison-style">Email</p>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={(event) => {
                this.onChange(event);
              }}
              placeholder="Enter your Email ID"
              className="divison"
            />
            {this.state.wrongEmail ? (
              <p className="firstvalidationstyle">{this.state.wrongEmail}</p>
            ) : (
              <></>
            )}
          </label>
          <label>
            <p className="divison-style">Password</p>
            <input
              type="password"
              name="password"
              onChange={(event) => {
                this.onChange(event);
              }}
              placeholder="Enter your Password"
              className="divison"
            />
            {this.state.wrongPassword ? (
              <p className="secondvalidationstyle">
                {this.state.wrongPassword}
              </p>
            ) : (
              <></>
            )}
          </label>
          <label>
            <p className="remember-me-style">
              {" "}
              <input
                type="checkbox"
                name="rememberMe"
                checked={this.state.rememberMe}
                onChange={(event) => {
                  this.changeCheckBox(event);
                }}
              />{" "}
              Remember me?
            </p>
          </label>
          <div>
            <button type="submit" className="button-style">
              Sign in
            </button>
          </div>
        </form>{" "}
        <br />
        <div className="link1-style">
          <a href="#">Forgot your password?</a>
        </div>
        <br />
        <div className="link2-style">
          Don't have an account? <a href="#">Sign up</a>
        </div>
        <br />
        <div className="link3-style">
          {" "}
          <a href="#">Resend email confimation</a>
        </div>
      </div>
    );
  }
}

export default LoginForm;
