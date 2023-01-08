import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { JobPostAction } from '../../store/asyncMethods/JobMethod';
import { Helmet } from "react-helmet";

// Scss import
import "./jobpost.scss"

// Icons import
import { AiFillPlusCircle } from "react-icons/ai"

// React toast
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const JobPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, redirect, loading } = useSelector(state => state.auth);

    const { jobPostErrors } = useSelector(state => state.job);

    useEffect(() => {
        if (redirect) {
            navigate("/recruiter-dashboard");
        }
        if (jobPostErrors?.length > 0) {
            jobPostErrors.map((error) => {
                // console.log(error.msg)
                toast.error(error.msg);
            })
        }
    }, [jobPostErrors, redirect]);

    const [jobDetails, setJobDetails] = useState({
        recruiter_id: user._id,
        companyname: user.name,
        jobprofile: '',
        jobtype: '',
        minsalary: '',
        maxsalary: '',
        aboutcompany: '',
        minexperience: '',
        maxexperience: '',
        location: '',
        deadline: '',
        responsibilities: []
    })

    const handleJobDetailsChange = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
    }

    const addNewResponsibility = () => {
        const newResponsibility = [...jobDetails.responsibilities, {
            id: jobDetails.responsibilities.length,
            responsibility: ""
        }]

        setJobDetails({ ...jobDetails, responsibilities: newResponsibility })
    }

    const handleResponsibilities = (e, i) => {
        let newResponsibilities = []
        jobDetails.responsibilities.map((res, idx) => {
            if (idx === i) {
                newResponsibilities.push({
                    ...res,
                    [e.target.name]: e.target.value
                })
            }
            else {
                newResponsibilities.push(res)
            }
        })
        setJobDetails({ ...jobDetails, responsibilities: newResponsibilities })
    }

    const saveJob = () => {
        dispatch(JobPostAction(jobDetails));
    }

    useEffect(() => {
        // console.log(jobDetails)
    }, [jobDetails])

    return (
        loading ? <Loader /> :
            <div className='jobpost'>
                <Helmet>
                    <title>Job Post</title>
                    <meta
                        name="description"
                        content="Job Post"
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
                <div className='jobpost_inputcontainer'>
                    <h4>Company Name</h4>
                    <input type="text" value={user.name} />
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>Job profile</h4>
                    <input type="text" name="jobprofile" placeholder='Enter job profile' onChange={(e) => handleJobDetailsChange(e)} />
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>Job type</h4>
                    <select name="jobtype" value={jobDetails.jobtype} id="jobtype" onChange={(e) => handleJobDetailsChange(e)} style={{ width: "94%" }}>
                        <option value="full-time">Full time</option>
                        <option value="part-time">Part time</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>Salary</h4>
                    <div className='jobpost_halfinputcontainer'>
                        <div>
                            <h4>Min</h4>
                            <input type="number" name="minsalary" placeholder='Enter min salary' onChange={(e) => handleJobDetailsChange(e)} />
                        </div>
                        <div>
                            <h4>Max</h4>
                            <input type="number" name="maxsalary" placeholder='Enter max profile' onChange={(e) => handleJobDetailsChange(e)} />
                        </div>
                    </div>
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>About company</h4>
                    <textarea rows="6" placeholder='Write something about your company' name="aboutcompany" onChange={(e) => handleJobDetailsChange(e)}></textarea>
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>Experience</h4>
                    <div className='jobpost_halfinputcontainer'>
                        <div>
                            <h4>Min</h4>
                            <input type="number" name="minexperience" onChange={(e) => handleJobDetailsChange(e)} placeholder="Enter min required exprience" />
                        </div>
                        <div>
                            <h4>Max</h4>
                            <input type="number" name="maxexperience" onChange={(e) => handleJobDetailsChange(e)} placeholder="Enter max required exprience" />
                        </div>
                    </div>
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>Location</h4>
                    <input type="text" name="location" placeholder='Enter job location' onChange={(e) => handleJobDetailsChange(e)} />
                </div>

                <div className='jobpost_inputcontainer'>
                    <h4>Responsibilities</h4>
                    {
                        jobDetails.responsibilities.map((res, i) => (
                            <input name="responsibility" type="text" value={res.responsibility} onChange={(e) => handleResponsibilities(e, i)} />
                        ))
                    }
                    <div className='jobpost_inputcontainer_addresponsibility'><AiFillPlusCircle onClick={() => addNewResponsibility()} /></div>
                </div>
                <div className='jobpost_inputcontainer'>
                    <h4>Application Deadline</h4>
                    <input type="date" name="deadline" onChange={(e) => handleJobDetailsChange(e)} />
                </div>

                <button className='jobpost_button' onClick={() => saveJob()}>Post Job</button>
            </div>
    )
}

export default JobPost