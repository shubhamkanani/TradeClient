import React, { useEffect } from "react";
import login from "../assets/css/login.css";
import {
  handleLoginInput,
  loginSubmit,
  storeSocalInfo,
} from "../Actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookLogin from "react-facebook-login";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
};

const Login = (props) => {
  const dispatch = useDispatch();

  useEffect((evt) => {
    console.log("fn called");
  }, []);

  const stateData = useSelector((state) => {
    return state.auth;
  });

  const onSubmitHandlar = async () => {
    console.log("call", stateData);

    const dataToPass = {
      email: stateData.email,
      password: stateData.password,
    };

    await dispatch(loginSubmit(dataToPass, props));
    console.log("login response... ", stateData);
  };

  const onInputChangeHandlar = (event) => {
    dispatch(handleLoginInput(event));
    // console.log(stateData);
  };

  const goToRegister = () => {
    props.history.push("/register");
  };

  const responseFacebook = (response) => {
    dispatch(storeSocalInfo(response, props));
  };

  const componentClicked = () => {
    console.log("data... ");
  };

  return (
    <div className="container">
      <div className="col-12 main-content">
        <label>Welcome to Ticker</label>
      </div>
      <div className="col-12 main-content">
        <label>Share your investment insights with your friends.</label>
      </div>
      <div className="col-12 main-content">
        <label>Gift them stocks too!</label>
      </div>
      <div className="col-12 main-content">
        <label>
          <i className="fa fa-lock"></i> Connect your trading account with
          end-to-end encryption
        </label>
      </div>

      <div className="card">
        <div className="card-header">
          <label className="card-title">
            <h4 className="main_heading">Log in to Your account</h4>
          </label>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <form>
            <div
              className="reg-form-group label_main ml-2 mr-2"
              id="emailInput"
            >
              <label htmlFor="pwd">Email</label>
              <input
                type="email"
                className="form-control"
                id="pwd"
                placeholder="Enter your email address"
                name="email"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>

            <div className="reg-form-group label_main ml-2 mr-2">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                className="form-control"
                id="name"
                placeholder="Enter a password"
                name="password"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary create-account-btn "
              onClick={() => {
                onSubmitHandlar();
              }}
            >
              Login
            </button>

            <FacebookLogin
              appId="591901098372972"
              autoLoad={true}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              cssClass="btn btn-block btn-primary create-account-btn mt-3"
            />
          </form>

          <div className="dropdown-divider reg-divider"></div>
          <div className="ml-3 mr-2 already-account">
            <label>Don't have have a Ticker account? </label>{" "}
            <label className="login-url" onClick={goToRegister}>
              Register
            </label>
          </div>
        </div>
        {/* /.card-body */}
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
