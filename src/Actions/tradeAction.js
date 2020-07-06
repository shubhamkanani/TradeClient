import swal from "sweetalert";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addNewTradeInputHandlar = (event) => {
  return (dispatch) => {
    console.log("innn callll");
    let name = event.target.name;
    let val = event.target.value;

    let formValue = { name: name, val: val };

    dispatch({ type: "GET_ADD_TRADEFORM", payload: formValue });
  };
};

export const viewTradeList = () => {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}trade/viewTrade?id=5ee0d3c100ad0715b0098667`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        if (result.data.code == 200) {
          dispatch({
            type: "VIEW_TRADE",
            payload: result.data.data,
          });
        }
      })
      .catch((error) => {
        console.log("error while getting data... ", error);
        toast.warn("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      });
  };
};

export const sendTradeRequest = () => {
  return (dispatch) => {};
};
