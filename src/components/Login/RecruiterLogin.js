import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RecruiterLoginAction } from '../../store/asyncMethods/AuthMethod';

const RecruiterLogin = () => {
  const dispatch = useDispatch();

  const [recruiterDetails, setRecruiterDetails] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setRecruiterDetails({...recruiterDetails, [e.target.name]: e.target.value})
  }

  const recruiterLogin = () => {
    dispatch(RecruiterLoginAction(recruiterDetails))
  }

  return (
    <div>
        <input type = "email" name = "email" placeholder='Enter email' value = {recruiterDetails.email} onChange = {(e) => handleChange(e)}/>
        <input type = "password" name = "password" placeholder='Enter password' value = {recruiterDetails.password} onChange = {(e) => handleChange(e)}/>
        <button onClick = {() => recruiterLogin()}>Submit</button>
    </div>
  )
}

export default RecruiterLogin