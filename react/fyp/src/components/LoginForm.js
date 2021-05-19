import React from "react";
// import CstAppBar from "./CstAppBar";
import { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const LoginForm = () => {
  const history = useHistory();
  //Initial auto-authentication
  useEffect(() => {
    fetch("http://localhost:5000/login/isAuth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        console.log(response);
        if (response !== "false") history.push("/dashboard/schedule/s");
      });
  }, [history]);

  //Submission
  const [loginInfo, newLogin] = useState({
    email: "",
    pass: "",
  });

  const [loginError, updateLoginError] = useState("");

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  function handleSubmit() {
    const formData = {
      loginEmail: loginInfo.email,
      loginPass: loginInfo.pass,
    };

    if (validationStatus.validEmail && validationStatus.validPass) {
      fetch("http://localhost:5000/login/process", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 202)
            return { response: response.json(), status: response.status };
          else return response.text();
        })
        .then((response) => {
          // localStorage.setItem("userType", response.userType);
          // localStorage.setItem("sessionID", response.sessionID);
          // console.log(response.status);
          if (response.status === 202) {
            updateLoginError("");
            history.push("/dashboard/schedule/s");
          } else updateLoginError(response);
        });
    }
  }

  function changeEmail(event) {
    newLogin({ email: event.target.value, pass: loginInfo.pass });
    if (fastValidation.email) validateInput();
  }
  function changePass(event) {
    newLogin({ email: loginInfo.email, pass: event.target.value });
    if (fastValidation.pass) validateInput();
  }

  //Input Validation
  const [validationStatus, changeStatus] = useState({
    validEmail: true,
    emailError: "",
    validPass: true,
    passError: "",
  });

  const [fastValidation, enableFastValidation] = useState({
    email: false,
    pass: false,
  });
  // const fastValidation = useRef({
  //   email: false,
  //   pass: false,
  // });

  const validateInput = () => {
    if (!fastValidation.email)
      enableFastValidation((prevState) => {
        return { ...prevState, email: true };
      });
    if (!fastValidation.pass)
      enableFastValidation((prevState) => {
        return { ...prevState, pass: true };
      });

    if (loginInfo.email.indexOf("@") > 0 && loginInfo.email.indexOf(".") > 2) {
      changeStatus((prevState) => {
        return { ...prevState, validEmail: true, emailError: "" };
      });
    } else
      changeStatus((prevState) => {
        return {
          ...prevState,
          validEmail: false,
          emailError: "Please Enter a Valid Email",
        };
      });

    if (loginInfo.pass < 1)
      changeStatus((prevState) => {
        return {
          ...prevState,
          validPass: false,
          passError: "Please Enter Your Password",
        };
      });
    else {
      changeStatus((prevState) => {
        return { ...prevState, validPass: true, passError: "" };
      });
    }
  };

  //Styling
  const useStyles = makeStyles({
    root: {
      paddingBottom: "1.5em",
    },
  });
  const textboxStyles = useStyles();

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "Column",
          alignItems: "center",
        }}
      >
        <form
          id="login-form"
          aria-label="Login Form"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "90vw",
            marginTop: "30vh",
            maxWidth: "300px",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            className={textboxStyles.root}
            autoFocus={true}
            fullWidth={true}
            inputProps={{
              type: "email",
              form: "login-form",
              name: "loginEmail",
            }}
            onChange={changeEmail}
            onBlur={validateInput}
            error={!validationStatus.validEmail}
            helperText={validationStatus.emailError}
            aria-label="Email"
          />
          <TextField
            label="Passoword"
            variant="outlined"
            inputProps={{
              type: "password",
              form: "loginForm",
              name: "loginPass",
            }}
            fullWidth={true}
            onChange={changePass}
            onBlur={validateInput}
            onKeyPress={(event) => {
              handleKeyPress(event);
            }}
            error={!validationStatus.validPass}
            helperText={validationStatus.passError}
            aria-label="Passoword"
            className={textboxStyles.root}
          />

          <Typography>{loginError}</Typography>

          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            color="secondary"
            style={{
              alignSelf: "flex-end",
            }}
          >
            Log In
          </Button>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
