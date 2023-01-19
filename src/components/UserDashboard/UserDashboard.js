import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMessage, setRedirectFalse } from '../../store/reducers/AuthReducer';
import "./userdashboard.scss";
import moment from 'moment';
import { Helmet } from "react-helmet";

// React toast
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Loader/Loader';

const UserDashboard = () => {
    const dispatch = useDispatch();

    const { user, redirect, message, loading } = useSelector(state => state.auth)
    // console.log(user);

    useEffect(() => {
        if (redirect) {
            dispatch(setRedirectFalse());
        }
        if (message) {
            toast.success(message);
            dispatch(removeMessage())
        }
    }, [redirect, message]);

    // useEffect(() => {
    //     console.log(loading);
    // }, [loading])

    return (
        loading ? <Loader /> :
            <div className='userdashboard'>
                <Helmet>
                    <title>User Dashboard</title>
                    <meta
                        name="description"
                        content="User Dashboard"
                    />
                </Helmet>
                <ToastContainer
                    className="toastClass"
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <h2>Your applications</h2>
                <div className='userdashboard_applied'>
                    {
                        user?.appliedCompany?.length > 0 ? (
                            <table>
                                <tr>
                                    <th>COMPANY NAME</th>
                                    <th>APPLIED FOR</th>
                                    <th>NUMBER OF APPLICANTS</th>
                                    <th>STATUS</th>
                                    <th>APPLIED ON</th>
                                </tr>
                                {
                                    user.appliedCompany.map((company) => (
                                        <tr>
                                            <td>{company.companyname}</td>
                                            <td>{company.jobprofile}</td>
                                            <td>{company.noofapplicants}</td>
                                            <td style={{color: company.viewStatus ? "#32cd32" : "#271964"}}>{company.viewStatus ? "Viewed" : "Applied"}</td>
                                            {
                                                company.appliedAt ? <td>{moment(company.appliedAt).format('ll')}</td> : "None"
                                            }
                                            {/* {moment(job.updatedAt).add(10, 'days').calendar()} */}
                                        </tr>
                                    ))
                                }
                            </table>
                        ) :
                            <h1>Oops...You have not applied for any company.</h1>
                    }
                </div>

            </div>
    )
}

export default UserDashboard