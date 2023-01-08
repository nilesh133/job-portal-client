import React from 'react'
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const UserPrivateRoute = ({children}) => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user)

  return user && !user.isRecruiter ? (
    children
  ) :
  <Navigate to = "/"/>
}

export default UserPrivateRoute