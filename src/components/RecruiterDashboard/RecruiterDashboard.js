import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FetchRecruiterJobsAction } from '../../store/asyncMethods/JobMethod'
import moment from "moment"
import { Helmet } from "react-helmet";

// React toast
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Scss import
import "./recruiterdashboard.scss"
import { removeMessage, setRedirectFalse } from '../../store/reducers/AuthReducer';
import Loader from '../Loader/Loader';

const RecruiterDashboard = () => {
  const dispatch = useDispatch();

  const { user, redirect, message, loading } = useSelector(state => state.auth)
  const { recruiterJobs } = useSelector(state => state.job)

  useEffect(() => {
    if (redirect) {
      dispatch(setRedirectFalse());
    }
    if (message) {
      toast.success(message);
      dispatch(removeMessage())
    }
  }, [redirect, message]);

  useEffect(() => {
    dispatch(FetchRecruiterJobsAction(user._id))
  }, [])

  // console.log("Recruiter")

  return (
    loading ? <Loader /> :
      <div className='recruiter_dashboard'>
        <Helmet>
          <title>Recruiter Dashboard</title>
          <meta
            name="description"
            content="Recruiter Dashboard"
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
        <div className='recruiter_dashboard_analytics'>
          <div className='recruiter_dashboard_analytics_box'>
            <h3>Total jobs posted</h3>
            <h4>{recruiterJobs.length}</h4>
          </div>
          {/* <div className='recruiter_dashboard_analytics_box'>
            <h3>Total jobs posted</h3>
            <h4>81</h4>
          </div>
          <div className='recruiter_dashboard_analytics_box'>
            <h3>Total jobs posted</h3>
            <h4>23</h4>
          </div> */}
        </div>

        <div className='recruiter_dashboard_jobs'>
          {
            recruiterJobs.map((job) => (
              <div className='recruiter_dashboard_jobs_box'>
                <h2>{job.jobprofile}</h2>
                <p><span>Job type</span> : {job.jobtype}</p>
                <p><span>Experience</span> : {job.minexperience} - {job.maxexperience} years</p>
                <p><span>Salary</span> : {job.minsalary} - {job.maxsalary} LPA</p>
                <div className='recruiter_dashboard_jobs_box_button'>
                  <p><span>Posted on</span> : {moment(job.createdAt).add(0, 'days').calendar()}</p>
                  <Link to={`/jobs-${job.companyname}-${job.jobprofile}-${job._id}-${job.recruiter_id}-candidates`}><button>View all candidates</button></Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
  )
}

// companyname-jobprofile-id-candidates

export default RecruiterDashboard