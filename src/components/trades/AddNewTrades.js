import React, { useState, useEffect } from "react";
import SocialHeader from "../social/Header";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../assets/css/trade.css";
import {
  addNewTradeInputHandlar,
  viewTradeList,
  sendTradeRequest,
} from "../../Actions/tradeAction";

const AddNewTrades = (props) => {
  const [modalToggle, setModalToggle] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const stateData = useSelector((state) => {
    return state.trade;
  });

  useEffect(() => {
    dispatch(viewTradeList());
  }, []);

  const modalStateChanged = () => {
    if (modalToggle) {
      console.log(modalToggle);
      setModalToggle(false);
    } else {
      console.log(modalToggle);
      setModalToggle(true);
    }
  };

  const openModal = () => {
    setModalToggle(true);
  };

  const closeModal = () => {
    setModalToggle(false);
  };

  const send = (tradeId) => {
    history.push("/showUser", tradeId);
    // dispatch(sendTradeRequest());
  };

  const AddNewTradeModal = () => {
    const onTradeInputChangeHandlar = (event) => {
      dispatch(addNewTradeInputHandlar(event));
      console.log(stateData);
    };

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add new trade
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => closeModal()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="tradeName"
                  name="tradeName"
                  aria-describedby="nameHelp"
                  onChange={(e) => onTradeInputChangeHandlar(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputQty">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="tradeQty"
                  name="tradeQty"
                  onChange={(e) => onTradeInputChangeHandlar(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputQty">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="tradeAmount"
                  name="tradeAmount"
                  onChange={(e) => onTradeInputChangeHandlar(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => closeModal()}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SocialHeader />
      <div
        className="row"
        style={{ paddingTop: "20px", margin: "20px", overflow: "auto" }}
      >
        <div className="col-12">
          <table className="table dt-responsive">
            <tbody>
              <tr>
                <td colSpan="4">
                  <div>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => modalStateChanged()}
                    >
                      + Add new trade
                    </button>
                    {modalToggle ? <AddNewTradeModal /> : null}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table dt-responsive">
            <thead>
              <tr>
                <td>
                  <b>Name</b>
                </td>
                <td>
                  <b>Quantity</b>
                </td>
                <td>
                  <b>Price</b>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {stateData.tradeList ? (
                stateData.tradeList.length ? (
                  stateData.tradeList.map((trade) => (
                    <tr key={trade._id}>
                      <td>{trade.name}</td>
                      <td>{trade.quantity}</td>
                      <td>{trade.amount}</td>
                      <td className="text-right">
                        <button
                          className="btn btn-success btn-rounded"
                          onClick={() => send(trade._id)}
                        >
                          {trade.shared ? "Shared" : "Share"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center">
                      <p>
                        <b>No Trading information found</b>
                      </p>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="text-center" colSpan="4">
                    <p>
                      <b>Loading...</b>
                    </p>
                  </td>
                </tr>
              )}
              {/* <button
                    className="btn btn-danger btn-rounded"
                    onClick={() => connectReq(user._id)}
                  >
                    {user.connected ? "Connected" : "Connect"}
              </button> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddNewTrades;
