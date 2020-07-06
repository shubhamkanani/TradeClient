import React from "react";
import SocialHeader from "../social/Header";

function ShowUserForTrade(props) {
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
                <td>User1</td>
              </tr>
              <tr>
                <td>User2</td>
              </tr>
              <tr>
                <td>User3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowUserForTrade;
