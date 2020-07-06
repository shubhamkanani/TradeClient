import React, { useReducer, useEffect } from "react";
import SocialHeader from "../social/Header";
import { useDispatch, useSelector, connect } from "react-redux";
import { viewUsers, connectRequest } from "../../Actions/userAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllUsers(props) {
  const dispatch = useDispatch();

  const stateData = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(viewUsers(props.location.state));
  }, []);

  const connectReq = async (idToPass) => {
    let id = {
      userId: idToPass,
    };
    await dispatch(connectRequest(id));
    await dispatch(viewUsers());
  };

  return (
    <div>
      <SocialHeader />
      <ToastContainer />
      <div className="row" style={{ paddingTop: "20px", margin: "20px" }}>
        <div className="col-12">
          <table className="table dt-responsive">
            <tbody>
              {stateData.userList ? (
                stateData.userList.length ? (
                  stateData.userList.map((user) => (
                    <tr key={user._id}>
                      <td style={{ width: "50px" }}>
                        <img
                          src={
                            user.profilePic
                              ? user.profilePic
                              : "../../dist/img/user2-160x160.jpg"
                          }
                          className="img-circle elevation-2"
                          width="40"
                          height="40"
                        />
                      </td>
                      <td>
                        {user.firstName} {user.lastName} {user.connected}
                      </td>
                      <td className="text-right">
                        <button
                          className="btn btn-danger btn-rounded"
                          onClick={() => connectReq(user._id)}
                        >
                          {user.connected ? "Connected" : "Connect"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center">
                      <p>
                        <b>No user found</b>
                      </p>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="text-center">
                    <p>
                      <b>Loading...</b>
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { props: state.props };
};

export default connect(mapStateToProps)(AllUsers);
