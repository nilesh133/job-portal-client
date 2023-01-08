import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserRegisterAction } from "../../store/asyncMethods/AuthMethod";
import { UserLoginAction } from '../../store/asyncMethods/AuthMethod';
import { Helmet } from "react-helmet";

// React toastify
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Scss import
import "./userauth.scss"
import { useNavigate } from 'react-router-dom';

// Icons import
import { BsPerson } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from 'react-icons/ri';

const UserAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [toggle, setToggle] = useState(true);

    const { loginErrorsArray, redirect } = useSelector(state => state.auth);

    useEffect(() => {
        if (redirect) {
            navigate("/user-dashboard")
        }

        if (loginErrorsArray?.length > 0) {
            loginErrorsArray.map((error) => {
                toast.error(error.msg);
            })
        }
    }, [loginErrorsArray, redirect]);

    // Register
    const [userRegister, setUserRegister] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleUserRegister = (e) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value })
    }

    const userRegisterSave = async () => {
        dispatch(UserRegisterAction(userRegister));
    }

    // Login
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })

    const handleUserLogin = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const userLoginSave = () => {
        dispatch(UserLoginAction(userLogin))
    }

    return (
        <div className='auth'>
            <Helmet>
                <title>User Auth</title>
                <meta
                    name="description"
                    content="User Auth"
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
                                value={userRegister.name}
                                onChange={(e) => handleUserRegister(e)}
                            />
                        </div>
                        <div className='auth_bottom_input'>
                            <span><HiOutlineMail /></span>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                value={userRegister.email}
                                onChange={(e) => handleUserRegister(e)}
                            />
                        </div>
                        <div className='auth_bottom_input'>
                            <span><RiLockPasswordLine /></span>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={userRegister.password}
                                onChange={(e) => handleUserRegister(e)}
                            />
                        </div>
                        <p>By signing up you agree to our</p>
                        <p>Terms of Service and Privacy Policy</p>
                        <button onClick={() => userRegisterSave()}>Register</button>
                    </div>
                ) :
                    <div className="auth_bottom">
                        <div className='auth_bottom_input'>
                            <span><HiOutlineMail /></span>
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter email'
                                value={userLogin.email}
                                onChange={(e) => handleUserLogin(e)}
                            />
                        </div>
                        <div className='auth_bottom_input'>
                            <span><RiLockPasswordLine /></span>
                            <input
                                type="password"
                                name="password"
                                placeholder='Enter password'
                                value={userLogin.password}
                                onChange={(e) => handleUserLogin(e)}
                            />
                        </div>
                        <p>By signing up you agree to our</p>
                        <p>Terms of Service and Privacy Policy</p>
                        <button onClick={() => userLoginSave()}>Submit</button>
                    </div>
            }
        </div>
    )
}

export default UserAuth