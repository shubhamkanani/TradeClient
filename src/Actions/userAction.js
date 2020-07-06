import swal from "sweetalert";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleRegisterInput = (event) => {
  return (dispatch) => {
    let name = event.target.name;
    let val = event.target.value;

    let formValue = { name: name, val: val };

    dispatch({ type: "GET_REGFORM", payload: formValue });
  };
};

export const handleLoginInput = (event) => {
  return (dispatch) => {
    let name = event.target.name;
    let val = event.target.value;

    let formValue = { name: name, val: val };

    dispatch({ type: "GET_LOGINFORM", payload: formValue });
  };
};

export const submitRegisterHandlar = (bodyData, props) => {
  return async (dispatch) => {
    console.log("req.body to pass", bodyData);

    const result = await fetch(`${process.env.REACT_APP_API_URL}register`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultData = result.json();

    resultData
      .then((data) => {
        if (data.code == 200) {
          console.log(data);
          dispatch({ type: "IS_REGISTER", payload: true });
          localStorage.setItem("treadingAccountToken", data.authToken);
          localStorage.setItem("name", data.firstName);
          localStorage.setItem("profilepic", data.profilePic);

          toast.success("Your account created successfully");

          props.history.push(`/profile/${data._id}`);
        } else {
          swal("Error!", "Somthing want wrong,Please try again!", "error");
          setInterval(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("err... ", err);
      });
  };
};

export const getUserProfileInfo = (id) => {
  return async (dispatch) => {
    // console.log("getProfile info");

    const result = await fetch(
      `${process.env.REACT_APP_API_URL}viewProfile?userId=${id}`
    );
    const resultData = result.json();

    resultData
      .then((data) => {
        //console.log("data.. ", data.data);
        if (data.code == 200) {
          dispatch({ type: "GET_USER_PROFILE", payload: data.data });
          //   this.state.userInfo = data.data;
          //   this.state.firstName = data.data.firstName;
        }
      })
      .catch((err) => {
        console.log("err... ", err);
      });
    // let name = event.target.name;
    // let val = event.target.value;
    // let formValue = { name: name, val: val };
    // dispatch({ type: "GET_FORM", payload: formValue });
  };
};

const checkMimeType = (event) => {
  // gettting file object
  let files = event.target.files;

  // define message container

  let err = "";

  //list allow mime type

  const types = ["image/png", "image/jpeg", "image/gif"];

  // loop access array
  for (let x = 0; x < files.length; x++) {
    // compare file type doesn't match

    if (types.every((type) => files[x].type !== type))
      // create err msg and assign to container
      err += files[x].type + " is not supported formate \n\n  ";
    // Assign msg to error
  }

  if (err !== "") {
    // if message is not same old massage that mean has error

    event.target.value = null;

    //console.log(err);

    return false;
  }

  // for (let z = 0; z < err.length; z++) {
  //   // Loop created toast msg
  //   console.log(err);
  //   this.setState({ chkMimeType: err });
  //   event.target.value = null;
  //   //toast.error(err[z]);
  // }

  return true;
};

export const onImageChange = (event, id) => {
  return async (dispatch) => {
    if (event.target.files && event.target.files[0]) {
      //checkMimeType(event);

      if (checkMimeType(event)) {
        let fileInfo = event.target.files[0];
        let imageData = new FormData();
        const userId = id;
        imageData.append("profilePic", fileInfo);
        imageData.append("userId", userId);
        let reader = new FileReader();

        reader.onload = (e) => {
          dispatch({
            type: "IMAGE",
            payload: e.target.result,
          });

          const imageUrlInfo = { profilePic: e.target.result, userId: userId };
          fetch(`${process.env.REACT_APP_API_URL}editProfileImg`, {
            method: "post",
            body: JSON.stringify(imageUrlInfo),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((messages) => {
              console.log(messages.code);
              console.log(messages);
              if (messages.code === 200) {
                swal("Success!", "Image Updated successfully", "success");
              } else {
                swal(
                  "Error!",
                  "Some thing want wrong,Please try again!",
                  "success"
                );
              }
            });
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        swal(
          "Info!",
          "Please upload only png,jpeg,jpg formate image and image size should be less then 60KB",
          "info"
        );
      }
    }
  };
};

export const addUser = (data) => {
  return async (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}api/addNewUser`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("treadingAccountToken"),
      },
    })
      .then((res) => {
        let result = res.json();
        result
          .then((resultData) => {
            if (resultData.code == 200) {
              swal("Success!", "user created successfully", "success");
            } else {
              swal(
                "Error!",
                "Some thing went wrong,Please try again!",
                "success"
              );
            }
          })
          .catch((error) => {
            console.log("error ", error);
            swal(
              "Error!",
              "Some thing went wrong,Please try again!",
              "success"
            );
          });
      })
      .catch((error) => {
        console.log("error ", error);
        swal("Error!", "Some thing went wrong,Please try again!", "success");
      });
  };
};

export const viewUsers = (id) => {
  return async (dispatch) => {
    axios(`${process.env.REACT_APP_API_URL}viewUsers?id=${id}`, {
      method: "GET",
    })
      .then((result) => {
        if (result.data.code == 200) {
          dispatch({
            type: "ALL_USERS",
            payload: result.data.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
        });
      });
  };
};

export const connectRequest = (data) => {
  return async (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/connectUser`, data, {
        headers: {
          token: localStorage.getItem("treadingAccountToken"),
          "Content-Type": "application/json",
        },
      })
      .then(async (result) => {
        if (result.data.code == 200) {
          dispatch({
            type: "CONNECT_USER",
            payload: result.data.data,
          });

          toast.success("Connection request sent successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          toast.warn(result.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      })
      .catch((error) => {
        console.log("error... ", error);
        dispatch({
          type: "ERROR",
        });

        toast.warn("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      });
  };
};

export const loginSubmit = (data, props) => {
  return async (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}login`, data)
      .then((result) => {
        console.log("result... ", result);
        if (result.data.code == 200) {
          dispatch({
            type: "LOGIN_DATA",
            payload: {
              data: result.data.data,
              authToken: result.data.authToken,
            },
          });

          localStorage.setItem("treadingAccountToken", result.data.authToken);
          localStorage.setItem("name", result.data.data.firstName);
          localStorage.setItem("profilepic", result.data.data.profilePic);
          toast.success("Logged in successfully");

          props.history.push(`/profile/${result.data.data._id}`);
        } else {
          toast.error("Email or password wrong!!");
          setInterval(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("error .. ", err);
        toast.error("Somethihng went wrong!!");
        setInterval(() => {
          window.location.reload();
        }, 2000);
      });
  };
};

export const storeSocalInfo = (data, props) => {
  return async (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}socialLogin`, data)
      .then((result) => {
        console.log("result.. ", result);
        if (result.data.code == 200) {
          dispatch({
            type: "FACEBOOK_DATA",
            payload: {
              data: result.data.data,
              authToken: result.data.authToken,
              accessToken: result.data.accessToken,
            },
          });

          localStorage.setItem("treadingAccountToken", result.data.authToken);
          localStorage.setItem("name", result.data.data.firstName);
          localStorage.setItem("profilepic", result.data.data.profilePic);
          props.history.push(`/profile/${result.data.data._id}`);
        } else {
          dispatch({
            type: "ERROR",
          });
        }
      })
      .catch((err) => {
        console.log("error in social... ", err);
        dispatch({
          type: "ERROR",
        });
      });
  };
};
