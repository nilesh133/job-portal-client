import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

import Home from './components/Home/Home';
import JobCandidates from './components/JobCandidates/JobCandidates';
import JobPost from './components/JobPost/JobPost';
import Loader from './components/Loader/Loader';
import RecruiterLogin from './components/Login/RecruiterLogin';
import UserLogin from './components/Login/UserLogin';
import Navbar from './components/Navbar/Navbar';
import RecruiterAuth from './components/RecruiterAuth/RecruiterAuth';
import RecruiterDashboard from './components/RecruiterDashboard/RecruiterDashboard';
import RecruiterProfile from './components/RecruiterProfile/RecruiterProfile';
import RecruiterRegister from './components/Register/RecruiterRegister';
import UserRegister from './components/Register/UserRegister';
import UserAllJobs from './components/UserAllJobs/UserAllJobs';
import UserAuth from './components/UserAuth/UserAuth';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserMessages from './components/UserMessages/UserMessages';
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileView from './components/UserProfileView/UserProfileView';
import UserSingleJobView from './components/UserSingleJobView/UserSingleJobView';
import RecruiterPrivateRoute from './private/RecruiterPrivateRoute';
import UserPrivateRoute from './private/UserPrivateRoute';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/loader" element={<Loader />}></Route> */}
          {/* <Route path="/recruiter-register" element={<RecruiterRegister />}></Route> */}
          {/* <Route path="/user-register" element={<UserRegister />}></Route> */}
          {/* <Route path="/recruiter-login" element={<RecruiterLogin />}></Route> */}
          {/* <Route path="/user-login" element={<UserLogin />}></Route> */}

          <Route path="/recruiter-auth" element={<RecruiterAuth />}></Route>
          <Route path="/user-auth" element={<UserAuth />}></Route>

          <Route path="/recruiter-dashboard" element={
            <RecruiterPrivateRoute>
              <RecruiterDashboard />
            </RecruiterPrivateRoute>
          }
          />
          <Route path="/user-dashboard" element={
            <UserPrivateRoute>
              <UserDashboard />
            </UserPrivateRoute>
          }
          />
          <Route path="/user-profile" element={
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          }
          />
          <Route path="/job-post" element={
            <RecruiterPrivateRoute>
              <JobPost />
            </RecruiterPrivateRoute>
          }
          />
          <Route path="/recruiter-dashboard" element={
            <RecruiterPrivateRoute>
              <RecruiterDashboard />
            </RecruiterPrivateRoute>
          }
          />
          <Route path="/user-all-jobs" element={
            <UserPrivateRoute>
              <UserAllJobs />
            </UserPrivateRoute>
          } />
          <Route path="/user-all-jobs-:company-:jobprofile-:id" element={
            <UserPrivateRoute>
              <UserSingleJobView />
            </UserPrivateRoute>
          } />
          <Route path="/jobs-:companyname-:jobprofile-:id-:recruiterid-candidates" element={
            <RecruiterPrivateRoute>
              <JobCandidates />
            </RecruiterPrivateRoute>
          } />
          <Route path="/user-profile-view/:name/:id" element={
            <RecruiterPrivateRoute>
              <UserProfileView />
            </RecruiterPrivateRoute>
          } />
           <Route path="/user-profile-view/:name/:id" element={
            // 637faa5d3a60bc38e3828cb4
            <UserPrivateRoute>
              <UserProfileView />
            </UserPrivateRoute>
          } />
           <Route path="/user-messages" element={
            <UserPrivateRoute>
              <UserMessages />
            </UserPrivateRoute>
          } />
          <Route path="/recruiter-profile" element={
            <RecruiterPrivateRoute>
              <RecruiterProfile />
            </RecruiterPrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App