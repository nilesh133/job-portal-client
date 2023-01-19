import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FetchUserSingleJobAction, UserJobApplyAction } from '../../store/asyncMethods/JobMethod';
import moment from "moment"
import { Helmet } from "react-helmet";

// Scss import
import "./usersinglejobview.scss"

// Images import
import company_logo from "../../images/company-logo.png"

// Icons import
import { HiOfficeBuilding, HiCurrencyRupee } from "react-icons/hi";
import { ImLocation } from "react-icons/im";

// React toast
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Loader/Loader';
import { RiBuilding2Fill } from 'react-icons/ri';
import { FaRupeeSign } from 'react-icons/fa';

const UserSingleJobView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMounted = useRef();

    const { companyname, jobprofile, id } = useParams();

    const { userSingleJob } = useSelector(state => state.job);

    const { user, loading, redirect } = useSelector(state => state.auth);

    const [applyDisable, setApplyDisable] = useState(false);

    useEffect(() => {
        if (redirect) {
            navigate("/user-dashboard")
        }
    }, [redirect]);

    const handleJobApply = () => {
        console.log("clicked")
        dispatch(UserJobApplyAction({
            userid: user._id,
            jobid: id,
            name: user.name,
            comapanyid: userSingleJob._id,
            companyname: userSingleJob.companyname,
            jobprofile: userSingleJob.jobprofile,
            appliedAt: new Date().getTime()
        }));
    }

    useEffect(() => {
        // if (isMounted.current) return;
        console.log("E1")
        userSingleJob.appliedUsers?.map((curruser) => {
            if (curruser.user_id === user._id) {
                console.log("E2")
                setApplyDisable(true);
            }
        })
        // isMounted.current = true;
    }, [userSingleJob])


    useEffect(() => {
        dispatch(FetchUserSingleJobAction(companyname, jobprofile, id));
    }, [])

    console.log("->", applyDisable)

    return (
        loading ? <Loader /> :
            <div className='usersinglejob'>
                <Helmet>
                    <title>Job Description</title>
                    <meta
                        name="description"
                        content="Job Description"
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
                <div className='usersinglejob_jobprofile'>
                    <h3>{userSingleJob.jobprofile}</h3>
                </div>
                <div className='usersinglejob_details'>
                    <div className='usersinglejob_details_left'>
                        <div className='usersinglejob_details_left_logo'>
                            <img src={userSingleJob.recruiter_logo} />
                            <div className='usersinglejob_details_left_logo_info'>
                                <h4>{userSingleJob.jobprofile}</h4>
                                <div style={{flexDirection: "column"}}>
                                    <p><span style={{fontSize: "1.2rem"}}><RiBuilding2Fill /></span>{userSingleJob.companyname}</p>
                                    <p><span><ImLocation /></span>{userSingleJob.location}</p>
                                    <p><span><FaRupeeSign /></span>{userSingleJob.minsalary} - {userSingleJob.maxsalary} LPA</p>
                                </div>
                            </div>
                        </div>
                        <div className='usersinglejob_details_left_desc'>
                            <h3>About company</h3>
                            <p>{userSingleJob.aboutCompany}</p>
                        </div>
                        <div className='usersinglejob_details_left_desc'>
                            <h3>Job description</h3>
                            <p>{userSingleJob.jobdescription}</p>
                        </div>
                        <div className='usersinglejob_details_left_desc'>
                            <h3>Key responsibilities</h3>
                            {
                                userSingleJob.responsibilities?.map((res, i) => (
                                    <p>{i + 1}. {res.responsibility}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className='usersinglejob_details_right'>
                        <h3>Job Summary</h3>
                        <p>Published on: <span>{moment(userSingleJob.updatedAt).format("MMM Do YY")}</span></p>
                        <p>Employment type: <span>{userSingleJob.jobtype}</span></p>
                        <p>Required experience: <span>{userSingleJob.minexperience} - {userSingleJob.maxexperience} years</span></p>
                        <p>Location: <span>{userSingleJob.location}</span></p>
                        <p>Salary: <span>{userSingleJob.minsalary} - {userSingleJob.maxsalary} LPA</span></p>
                        <p>Last date to apply: <span>{moment(userSingleJob.deadline).format("MMM Do YY")}</span></p>
                        <input type="submit" value={applyDisable ? "Applied" : "Apply Now"} className={applyDisable ? "usersinglejob_details_right_disabletrue" : "usersinglejob_details_right_disablefalse"} onClick={() => handleJobApply()} />
                    </div>
                </div>
            </div>
    )
}

export default UserSingleJobView