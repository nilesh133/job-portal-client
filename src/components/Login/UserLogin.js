import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { UserLoginAction } from "../../store/asyncMethods/AuthMethod"

const UserLogin = () => {
    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const userLogin = () => {
        dispatch(UserLoginAction(userDetails))
    }

    return (
        <div>
            <input type="email" name="email" placeholder='Enter email' value={userDetails.email} onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder='Enter password' value={userDetails.password} onChange={(e) => handleChange(e)} />
            <button onClick={() => userLogin()}>Submit</button>
        </div>
    )
}

export default UserLogin