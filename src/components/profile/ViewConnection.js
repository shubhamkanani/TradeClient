import React from 'react'
import SocialHeader from '../social/Header'

function ViewConnection() {
    return (
        <div>
            <SocialHeader />
            <div className="row" style={{ paddingTop: '20px', margin:'20px' }}>
                <div className="col-12">
                    <table className="table dt-responsive">
                        <tbody>
                            <tr>
                                <td className="text-justify">Test 1</td>
                                <td className="text-right">
                                    <button className="btn btn-round btn-danger">Send Request</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-justify">Test 2</td>
                                <td className="text-right">
                                    <button className="btn btn-round btn-danger">Send Request</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewConnection
