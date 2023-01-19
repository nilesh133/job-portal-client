import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { FetchUserAllJobsAction } from '../../store/asyncMethods/JobMethod';
import moment from 'moment';
import { Helmet } from "react-helmet";

// Scss import
import "./useralljobs.scss"

// Icons import
import { HiOfficeBuilding, HiCurrencyRupee } from "react-icons/hi";
import {FaRupeeSign} from "react-icons/fa";
import {RiBuilding2Fill} from "react-icons/ri"
import { ImLocation } from "react-icons/im";
import Loader from '../Loader/Loader';

const UserAllJobs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector(state => state.auth);

    const { userAllJobs } = useSelector(state => state.job);

    const [userAllJobsList, setUserAllJobsList] = useState([]);

    const [appliedArr, setAppliedArr] = useState([]);

    useEffect(() => {
        dispatch(FetchUserAllJobsAction());
    }, [])

    // useEffect(() => {
    //     console.log(loading)
    // }, [loading])

    useEffect(() => {
        userAllJobs.map((job) => {
            job.appliedUsers?.map((applied) => {
                // console.log(applied)
                if (applied.user_id === user._id) {
                    const newAppliedArr = appliedArr;
                    newAppliedArr.push(job._id)
                    setAppliedArr(newAppliedArr)
                }
            })
        })
        // console.log("reached here")
        setUserAllJobsList(userAllJobs)
    }, [userAllJobs])

    // console.log(userAllJobsList);


    const images = ["https://images.unsplash.com/photo-1590102426275-8d1c367070d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1610128980054-68d94619e243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        "https://images.unsplash.com/photo-1632435499182-e436787ce107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        "https://images.unsplash.com/photo-1622465911368-72162f8da3e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        "https://images.unsplash.com/photo-1632047096430-9ae3a7a80836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ]

    const [filters, setFilters] = useState({
        location: '',
        profile: ''
    })

    const handleFiltersChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const applyFilter = () => {
        let newUserAllJobsList = []
        if (filters.location === '' && filters.profile === '') {
            setUserAllJobsList(userAllJobs)
        }
        else if (filters.location === '') {
            newUserAllJobsList = userAllJobsList.filter((job) => {
                return job.jobprofile?.toLowerCase() === filters.profile.toLowerCase();
            })
            setUserAllJobsList(newUserAllJobsList);
        }
        else if (filters.profile === '') {
            newUserAllJobsList = userAllJobsList.filter((job) => {
                return job.location?.toLowerCase() === filters.location.toLowerCase();
            })
            setUserAllJobsList(newUserAllJobsList);
        }
        else {
            newUserAllJobsList = userAllJobsList.filter((job) => {
                return job.location?.toLowerCase() === filters.location.toLowerCase() && job.jobprofile?.toLowerCase() === filters.profile.toLowerCase();
            })
            setUserAllJobsList(newUserAllJobsList);
        }
    }

    useEffect(() => {
        // console.log(filters);
    }, [filters])


    return (
        loading ? <Loader /> :
            <div className='useralljobs'>
                <Helmet>
                    <title>User All Jobs</title>
                    <meta
                        name="description"
                        content="User All Jobs"
                    />
                </Helmet>
                <div className='useralljobs_filter'>
                    <div className='useralljobs_filter_box'>
                        <h3>Location</h3>
                        <input type="text" name="location" value={filters.location} placeholder="Search for location" onChange={(e) => handleFiltersChange(e)} />
                    </div>
                    <div className='useralljobs_filter_box'>
                        <h3>Profile</h3>
                        <input type="text" name="profile" value={filters.profile} placeholder="Search for profile" onChange={(e) => handleFiltersChange(e)} />
                    </div>
                    <div className='useralljobs_filter_box'>
                        <button onClick={() => applyFilter()}>Apply</button>
                    </div>

                </div>
                <div className='useralljobs_jobs'>
                    {
                        userAllJobsList.map((job, i) => (
                            !appliedArr?.includes(job._id) ?
                                <div className='useralljobs_jobs_box'>
                                    {/* {console.log(appliedArr)} */}
                                    <div className='useralljobs_jobs_box_left'>
                                        <img src={job.recruiter_logo} />
                                        <div>
                                            <h3>{job.jobprofile}</h3>
                                            <h4>Premium Labels Limited</h4>
                                            <div className='useralljobs_jobs_box_left_details'>
                                                <p><span>Location </span>{job.location}</p>
                                                <p><span>Salary </span>{job.minsalary} - {job.maxsalary} LPA</p>
                                                <p><span>Type </span>{job.jobtype}</p>
                                            </div>
                                            {/* <p>Location: <span>{job.location}</span></p>
                                    <p>Salary: <span>{job.minsalary} - {job.maxsalary}LPA</span></p>
                                    <p>Job type: <span>{job.jobtype}</span></p> */}
                                        </div>
                                    </div>
                                    <div className='useralljobs_jobs_box_right'>
                                        <button onClick={() => navigate(`/user-all-jobs-${job.companyname}-${job.jobprofile}-${job._id}`)}>
                                            View job {/* <Link to={`/user-all-jobs-${job.companyname}-${job.jobprofile}-${job._id}`}>View job</Link> */}
                                        </button>
                                        <p>Posted on: {moment(job.updatedAt).format("MMM Do YY")}</p>
                                    </div>
                                </div>
                                : ""
                        ))
                    }
                </div>
            </div>
    )
}

export default UserAllJobs