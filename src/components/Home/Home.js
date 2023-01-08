import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";

// Scss import
import "./home.scss"

// Images import
import home_bg_right from "../../images/home_bg_right.png";
import home_bg_right_1 from "../../images/home_bg_right_1.png";
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage, setRedirectFalse } from '../../store/reducers/AuthReducer';

// React toast
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const { user, redirect, loading, message } = useSelector(state => state.auth);

  // const [print, setPrint] = useState([])
  // const arr1 = [1, 2, 3, 4, 5, 6];
  // useEffect(() => {
  //   arr1.map((ele, i) => {
  //     if (i % 2 === 0) {
  //       console.log(i)
  //       setPrint([...print, ele])
  //     }
  //   })
  //   console.log(print)
  // }, [])

  useEffect(() => {
    if (redirect) {
      dispatch(setRedirectFalse());
    }
    if (message) {
      toast.success(message);
      dispatch(removeMessage())
    }
  }, [redirect, message]);

  return (
    loading ? <Loader /> :
      <div className='home_container'>

        <Helmet>
          <title>Home</title>
          <meta
            name="description"
            content= "Home"
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
        <div className='home_container_left'>
          <h2>The Best Place</h2>
          <h2>To Get</h2>
          <h2>Your Dream Job</h2>
          <div>
            {
              user ? (
                <Link to={user.isRecruiter ? "/recruiter-dashboard" : "/user-dashboard"}><button>Open Dashboard</button></Link>
              ) :
                <div>
                  <Link to="/recruiter-auth"><button>Register as Recruiter</button></Link>
                  <Link to="/user-auth"><button>Register as User</button></Link>
                </div>
            }

          </div>
        </div>
        <div className='home_container_right'>
          <img src={home_bg_right_1} />
        </div>
      </div>
  )
}

export default Home