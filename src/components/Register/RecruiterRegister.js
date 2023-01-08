import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RecruiterRegisterAction } from "../../store/asyncMethods/AuthMethod";

const RecruiterRegister = () => {
  const dispatch = useDispatch();
  const [recruiterDetails, setRecruiterDetails] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setRecruiterDetails({ ...recruiterDetails, [e.target.name]: e.target.value })
  }

  const recruiterRegister = async () => {
    dispatch(RecruiterRegisterAction(recruiterDetails));
  }

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder='Name'
        value={recruiterDetails.name}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="email"
        name="email"
        placeholder='Email'
        value={recruiterDetails.email}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        name="password"
        placeholder='Password'
        value={recruiterDetails.password}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={() => recruiterRegister()}>Register</button>
    </div>
  )
}

export default RecruiterRegister