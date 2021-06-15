import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MuiAlert from '@material-ui/lab/Alert';
import "../style/LoginRegister.css"

const register = (username, email, password) => {
  return axios.post("https://justadopt-6ygf3gqmiq-uc.a.run.app/auth/signup", {
    username,
    email,
    password,
  });
};

const Register = () => {

  const form = useRef();
  const checkerButton = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    form.current.validateAll();

    if (checkerButton.current.context._errors.length === 0) {
      register(username, email, password).then(
        (response) => {
          console.log(response)
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          console.log(error)
          setSuccessful(false);
          setMessage(error.message || error.toString());
        }
      );
    }
  };

  return (
    <div className="main-content">
      <Card variant="outlined">
        <CardContent className="register-form">

          <Form onSubmit={handleRegister} ref={form}>
            { !successful && (
              <div className="form-register">

                  <Input className="input-field"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                  />
                  <Input className="input-field"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                  <Input className="input-field"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, validPass]}
                  />

                <div className="input-button">
                  <button className="btn btn-secondary btn-block"> Sign Up </button>
              </div>
            </div>
            )}

            {message && (
              <div>
                { successful ? 
                <Alert className="alert-valid" severity="success">{message}</Alert> 
                : 
                <Alert className="alert-valid" severity="info">{message}</Alert>
                }
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkerButton} />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

function Alert(props) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

const required = (value) => {
  if (!value) {
    return (
      <Alert className="alert-valid" severity="error">Field is required</Alert>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <Alert className="alert-valid" severity="warning">Email is invalid</Alert>
    );
  }
};

const validPass = (value) => {
  if (value.length < 5) {
    return (
      <Alert className="alert-valid" severity="warning">Password is too short</Alert>
    );
  }
};


export default Register;
