import React, { useState, useRef } from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "../style/LoginRegister.css"

function Alert(props) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

const login = async (username, password) => {
  const response = await axios
    .post("http://localhost:8080/auth/signin", {
      username,
      password,
    });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const required = (value) => {
  if (!value) {
    return (
      <Alert className="alert-valid" severity="error">Field is required</Alert>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        login(username, password).then(
        () => {
          props.history.push("/");
          window.location.reload();
        },
        (error) => { 
          setMessage((error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString());
        }
      );
    } 
  };

  return (
    <div>
        <Card variant="outlined">
          <CardContent className="login-form">

            <Form onSubmit={handleLogin} ref={form}>
              <div className="form-login">
                <Input type="text"
                  className="input-field"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
                <Input type="password"
                  className="input-field"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="input-button">
                <button className="btn btn-primary btn-block">
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div>
                   <Alert className="alert-valid" severity="info">{message}</Alert>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </CardContent>
        </Card>
    </div>
  );
};

export default Login;
