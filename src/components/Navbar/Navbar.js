import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.scss"
import { UserLogoutAction } from '../../store/asyncMethods/AuthMethod';

// Icons import
import { SiGooglemessages } from "react-icons/si";

// Images import
import hireit_logo from "../../images/hireit-logo.png";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, redirect } = useSelector(state => state.auth);

    const logoutHandler = () => {
        localStorage.removeItem('myToken');
        dispatch(UserLogoutAction({user, time: new Date()}));
    }

    useEffect(() => {
        if(redirect){
            navigate("/")
        }
    }, [redirect])

    return (
        <div className='navbar'>
            <div className='navbar_logo'>
                <div>
                    <img src = {hireit_logo}/>
                </div>
                <span>Hire</span> 
                <span>It</span>
            </div>
            <div className='navbar_links'>
                {
                    user ? (
                        user.isRecruiter ? (
                            <>
                                <Link to="/">Home</Link>
                                <Link to="/job-post">Post a Job</Link>
                                <Link to="/recruiter-dashboard">Dashboard</Link>
                                <Link to="/recruiter-profile">Profile</Link>
                            </>
                        ) :
                            <>
                                <Link to="/">Home</Link>
                                <Link to="/user-all-jobs">Jobs</Link>
                                <Link to="/user-dashboard">Dashboard</Link>
                                <Link to="/user-profile">Profile</Link>
                            </>
                    ) :
                        <div>Please login or register to continue</div>
                }
            </div>
            <div className='navbar_logout'>
                {
                    user ? (
                        !user.isRecruiter ? (
                            <Link to = "/user-messages"><SiGooglemessages /></Link>
                        ) : ""
                    ) : ""
                }
                {
                    user ? (
                        <div className='navbar_profile'>
                            <h3 onClick={() => logoutHandler()}>Logout</h3>
                        </div>
                    ) :
                        ""
                }
            </div>
        </div>
    )
}

export default Navbar