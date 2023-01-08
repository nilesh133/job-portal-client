import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserRegisterAction } from "../../store/asyncMethods/AuthMethod";

const UserRegister = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserDetails({...userDetails, [e.target.name] : e.target.value})
  }

  const userRegister = async () => {
    dispatch(UserRegisterAction(userDetails));
  }

  return (
    <div>
      <input 
        type = "text"
        name = "name"
        placeholder='Name'
        value = {userDetails.name}
        onChange = {(e) => handleChange(e)}
      />
      <input 
        type = "email"
        name = "email"
        placeholder='Email'
        value = {userDetails.email}
        onChange = {(e) => handleChange(e)}
      />
      <input 
        type = "password"
        name = "password"
        placeholder='Password'
        value = {userDetails.password}
        onChange = {(e) => handleChange(e)}
      />
      <button onClick={() => userRegister()}>Register</button>
    </div>
  )
}

export default UserRegister