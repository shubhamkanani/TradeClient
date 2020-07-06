import React, { useState, useRef } from "react";
import {
  handleRegisterInput,
  submitRegisterHandlar,
  storeSocalInfo,
} from "../Actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookLogin from "react-facebook-login";

const Register = (props) => {
  const [emailInputBox, setEmailInputBox] = useState(false);
  const [mobileInputBox, setMobileInputBox] = useState(true);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [year, setYear] = useState(null);
  const dispatch = useDispatch();
  const myRef = useRef(null);

  const stateData = useSelector((state) => {
    return state.auth;
  });

  const onInputChangeHandlar = async (event) => {
    await dispatch(handleRegisterInput(event));
    console.log("input ", stateData);
  };

  const getMonth = (e) => {
    setMonth(e.target.value);
  };

  const getYear = (e) => {
    setYear(e.target.value);
  };

  const getDay = (e) => {
    setDay(e.target.value);
  };

  const changeEmailMobileInput = () => {
    if (emailInputBox) {
      setEmailInputBox(false);
    } else {
      dispatch({ type: "MOBILE_EMPTY", payload: null });
      setEmailInputBox(true);
    }

    if (mobileInputBox) {
      setMobileInputBox(false);
    } else {
      dispatch({ type: "EMAIL_EMPTY", payload: null });

      setMobileInputBox(true);
    }
  };

  const goToLogin = () => {
    props.history.push("/login");
  };

  const onSubmitHandlar = async () => {
    if (stateData.password === stateData.confpass) {
      if (day && month && year) {
        const dob = month + "-" + day + "-" + year;

        const createAccountData = {
          firstName: stateData.firstName,
          lastName: stateData.lastName,
          userName: stateData.userName,
          mobile: stateData.mobile,
          email: stateData.email,
          password: stateData.password,
          dob: dob,
          usertype: "endUser",
        };
        dispatch(submitRegisterHandlar(createAccountData, props));
        console.log("stateData.isReg ", stateData.isReg);
      } else {
        console.log("please fill all field!");
      }
    } else {
      console.log("password and confirm pass is not match");
    }
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
            <h4 className="main_heading">Create Your account</h4>
          </label>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <form>
            <div className="reg-form-group label_main ml-2 mr-2">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your first name"
                name="firstName"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>
            <div className="reg-form-group label_main ml-2 mr-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Enter your first name"
                name="lastName"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>
            <div className="reg-form-group label_main ml-2 mr-2">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your first name"
                name="userName"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>
            {mobileInputBox ? (
              <div
                className="reg-form-group label_main ml-2 mr-2"
                ref={myRef}
                id="phoneInput"
              >
                <label htmlFor="pwd">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter your phone no."
                  name="mobile"
                  onChange={(e) => onInputChangeHandlar(e)}
                />
              </div>
            ) : (
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
            )}

            {/* {mobileInputBox ? <PhoneInputElement /> : <EmailInputElement />} */}

            <div className="use-instead ml-3 mr-2 mb-3">
              <a onClick={() => changeEmailMobileInput()}>
                Use {mobileInputBox ? `email` : `mobile`} instead
              </a>
            </div>

            <div className="reg-form-group label_main ml-2 mr-2">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter a password"
                name="password"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>

            <div className="reg-form-group label_main ml-2 mr-2">
              <label htmlFor="name">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Confirm your password"
                name="confpass"
                onChange={(e) => onInputChangeHandlar(e)}
              />
            </div>

            <div className="label_main ml-3 mr-2">
              <label>Date of birth</label>
            </div>
            <div className="dob-description ml-3 mr-2">
              <label>
                This will not be shown publicly.Confirm your age to receive the
                approperiate experience.
              </label>
            </div>

            <div className="date_of_birth">
              <div className="col-12 col-lg-6 month pl-2 pr-2">
                <div className="reg-form-group label_main">
                  <label htmlFor="sel1">Month</label>
                  <select
                    className="form-control"
                    id="sel1"
                    name="month"
                    onChange={(e) => getMonth(e)}
                  >
                    <option value="">Select Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">Suptember</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-3 day pl-2 pr-2">
                <div className="reg-form-group label_main">
                  <label htmlFor="sel1">Day</label>
                  <select
                    className="form-control"
                    id="sel1"
                    onChange={(e) => getDay(e)}
                  >
                    <option value="">Select Day</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-3 year pl-2 pr-2">
                <div className="reg-form-group label_main">
                  <label htmlFor="sel1">Year</label>
                  <select
                    className="form-control"
                    id="sel1"
                    onChange={(e) => getYear(e)}
                  >
                    <option value="">Select Year</option>
                    <option>2001</option>
                    <option>2002</option>
                    <option>2003</option>
                    <option>2004</option>
                    <option>2005</option>
                    <option>2006</option>
                    <option>2007</option>
                    <option>2008</option>
                    <option>2009</option>
                    <option>2010</option>
                    <option>2011</option>
                    <option>2012</option>
                    <option>2013</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary create-account-btn "
              onClick={() => {
                onSubmitHandlar();
              }}
            >
              Create account
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
            <label>Already have a Ticker account? </label>{" "}
            <label className="login-url" onClick={goToLogin}>
              Log in
            </label>
          </div>
        </div>
        {/* /.card-body */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
