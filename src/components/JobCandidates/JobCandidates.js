import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { FetchRecruiterSingleJobAction, SetJobViewStatusAction } from '../../store/asyncMethods/JobMethod';
import moment from 'moment';
import { Helmet } from "react-helmet";

// Scss import
import "./jobcandidates.scss"
import Loader from '../Loader/Loader';

const JobCandidates = () => {
    const dispatch = useDispatch();

    const { companyname, jobprofile, id, recruiterid } = useParams();

    const { recruiterSingleJob } = useSelector(state => state.job);
    const { loading } = useSelector(state => state.auth);

    // console.log(recruiterSingleJob)

    const setJobViewStatus = (user_id) => {
        dispatch(SetJobViewStatusAction(user_id, companyname, recruiterid))
    }

    useEffect(() => {
        // console.log(recruiterid)
        dispatch(FetchRecruiterSingleJobAction(companyname, jobprofile, id))
    }, [])

    return (
        loading ? <Loader /> :
            <div className="jobcandidates">
                <Helmet>
                    <title>Job Candidates</title>
                    <meta
                        name="description"
                        content="Job Candidates"
                    />
                </Helmet>
                <div className='jobcandidates_jobdetails'>
                    <div className='jobcandidates_jobdetails_box'>
                        <h4>Job Profile</h4>
                        <h3>{recruiterSingleJob.jobprofile}</h3>
                    </div>
                    <div className='jobcandidates_jobdetails_box'>
                        <h4>Job Type</h4>
                        <h3>{recruiterSingleJob.jobtype}</h3>
                    </div>
                    <div className='jobcandidates_jobdetails_box'>
                        <h4>Salary</h4>
                        <h3>{recruiterSingleJob.minsalary} - {recruiterSingleJob.maxsalary} LPA</h3>
                    </div>
                    <div className='jobcandidates_jobdetails_box'>
                        <h4>Experience</h4>
                        <h3>{recruiterSingleJob.minexperience} - {recruiterSingleJob.maxexperience} years</h3>
                    </div>
                    <div className='jobcandidates_jobdetails_box'>
                        <h4>Posted on</h4>
                        <h3>{moment(recruiterSingleJob.updatedAt).add(0, 'days').calendar()}</h3>
                    </div>
                </div>
                <div className='jobcandidates_list'>
                    <table>
                        <tr>
                            <th>Candidate name</th>
                            <th>Applied on</th>
                            <th>Candidate profile</th>
                        </tr>
                        {
                            recruiterSingleJob?.appliedUsers?.map((user) => (
                                <tr>
                                    <td>{user.name}</td>
                                    {
                                        user.appliedAt ? <td>{moment(user.appliedAt).format('ll')}</td> : <td>None</td>
                                    }
                                    {/* /user-profile-view/:name/:id */}
                                    <td><Link onClick={() => setJobViewStatus(user.user_id)} to={`/user-profile-view/${user.name}/${user.user_id}`}>See profile</Link></td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
    )
}

export default JobCandidates