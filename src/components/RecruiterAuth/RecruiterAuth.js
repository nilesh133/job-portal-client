import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RecruiterRegisterAction } from "../../store/asyncMethods/AuthMethod";
import { RecruiterLoginAction } from '../../store/asyncMethods/AuthMethod';
import { Helmet } from "react-helmet";
// import toast, { Toaster } from 'react-hot-toast';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Scss import
import "./recruiterauth.scss"
import { useNavigate } from 'react-router-dom';

// Icons import
import { BsPerson } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from 'react-icons/ri';

const RecruiterAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [toggle, setToggle] = useState(true);

    const { registerErrorsArray, redirect, user } = useSelector(state => state.auth);

    // useEffect(() => {
    //     console.log(user)
    // }, [user])
    // useEffect(() => {
    //     console.log(registerErrorsArray)
    //     if (registerErrorsArray?.length > 0) {
    //         registerErrorsArray.map((error) => {
    //             toast.error(error.msg);
    //         })
    //     }
    // }, [registerErrorsArray]);

    useEffect(() => {
        if (redirect) {
            navigate("/recruiter-dashboard")
        }
        if (registerErrorsArray?.length > 0) {
            registerErrorsArray.map((error) => {
                toast.error(error.msg);
            })
        }
    }, [registerErrorsArray, redirect]);

    // Register
    const [recruiterRegister, setRecruiterRegister] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleRecruiterRegister = (e) => {
        setRecruiterRegister({ ...recruiterRegister, [e.target.name]: e.target.value })
    }

    const recruiterRegisterSave = async () => {
        dispatch(RecruiterRegisterAction(recruiterRegister));
    }

    // Login
    const [recruiterLogin, setRecruiterLogin] = useState({
        email: '',
        password: ''
    })

    const handleRecruiterLogin = (e) => {
        setRecruiterLogin({ ...recruiterLogin, [e.target.name]: e.target.value })
    }

    const recruiterLoginSave = () => {
        dispatch(RecruiterLoginAction(recruiterLogin))
    }

    return (
        <div className='auth'>
            {/* <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        border: '1px solid #713200',
                        fontSize: "0.8rem"
                    },
                }}
            /> */}
            <Helmet>
                <title>Recruiter Auth</title>
                <meta
                    name="description"
                    content="Recruiter Auth"
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
            {/* Same as */}

            <div className='auth_options'>
                <h3 className={toggle ? "auth_bottom_active" : ""} onClick={() => setToggle(true)}>Register</h3>
                <h3 className={!toggle ? "auth_bottom_active" : ""} onClick={() => setToggle(false)}>Login</h3>
            </div>
            {
                toggle ? (
                    <div className='auth_bottom'>
                        <div className='auth_bottom_input'>
                            <span><BsPerson /></span>
                            <input
                                type="text"
                                name="name"
                                placeholder='Name'
                                value={recruiterRegister.name}
                                onChange={(e) => handleRecruiterRegister(e)}
                            />
                        </div>

                        <div className='auth_bottom_input'>
                            <span><HiOutlineMail /></span>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                value={recruiterRegister.email}
                                onChange={(e) => handleRecruiterRegister(e)}
                            />
                        </div>

                        <div className='auth_bottom_input'>
                            <span><RiLockPasswordLine /></span>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={recruiterRegister.password}
                                onChange={(e) => handleRecruiterRegister(e)}
                            />
                        </div>
                        <p>By signing up you agree to our</p>
                        <p>Terms of Service and Privacy Policy</p>
                        <button onClick={() => recruiterRegisterSave()}>Register</button>
                    </div>
                ) :
                    <div className="auth_bottom">
                        <div className='auth_bottom_input'>
                            <span><HiOutlineMail /></span>
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter email'
                                value={recruiterLogin.email}
                                onChange={(e) => handleRecruiterLogin(e)}
                            />
                        </div>
                        <div className='auth_bottom_input'>
                            <span><RiLockPasswordLine /></span>
                            <input
                                type="password"
                                name="password"
                                placeholder='Enter password'
                                value={recruiterLogin.password}
                                onChange={(e) => handleRecruiterLogin(e)}
                            />
                        </div>
                        <p>By signing up you agree to our</p>
                        <p>Terms of Service and Privacy Policy</p>
                        <button onClick={() => recruiterLoginSave()}>Submit</button>
                    </div>
            }
        </div>
    )
}

export default RecruiterAuth