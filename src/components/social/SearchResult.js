import React from "react";
import { useHistory } from 'react-router-dom';

function SearchResult(props) {
  const history = useHistory();

  const redirect = (id) => {
    history.push(`/profile/${id}`);
  }
  
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <table className="table dt-responsive">
                <tbody>
                  {
                    props.value.data ? props.value.data.length ? props.value.data.map((user) => (
                      <tr key={user._id}>
                        <td style={{ cursor: 'pointer' }} onClick={() => redirect(user._id)}>{user.firstName} {user.lastName}</td>
                      </tr>
                    )) : <tr><td className="text-center"><b>No User Found</b></td></tr> : <tr><td className="text-center"><b>Loading...</b></td></tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
