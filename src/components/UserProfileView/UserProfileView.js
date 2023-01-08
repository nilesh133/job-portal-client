import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FetchUserProfileViewAction } from "../../store/asyncMethods/JobMethod";
import { FetchRecruiterMessagesAction, sendMessageAction } from '../../store/asyncMethods/MessagesMethod';
import moment from "moment"
import { Helmet } from "react-helmet";

// Scss import
import "./userprofileview.scss"

// Icons import
import { IoMdCamera } from "react-icons/io"
import { IoMail } from "react-icons/io5"
import { ImPhoneHangUp } from "react-icons/im"
import { FaBirthdayCake } from "react-icons/fa"
import { GoMarkGithub } from "react-icons/go"
import { RxLinkedinLogo } from "react-icons/rx"
import { RiProfileFill } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import Loader from '../Loader/Loader';


const UserProfileView = () => {
    const dispatch = useDispatch();

    const { name, id } = useParams();

    const { userProfileViewData } = useSelector(state => state.job);
    const { user, loading } = useSelector(state => state.auth);
    const { recruiterMessages } = useSelector(state => state.messages);

    const messageRef = useRef(null);

    const sendMessageHandler = () => {
        dispatch(sendMessageAction({ from: user._id, to: userProfileViewData._id, messageContent: messageRef.current.value, sender: user._id }));
        messageRef.current.value = ''
    }

    // console.log(0)

    // const messagesBottomScroll = useRef(null);

    // const scrollToBottom = () => {
    //     messagesBottomScroll.current?.scrollIntoView({ behavior: "smooth" })
    // }

    // useEffect(() => {
    //     scrollToBottom()
    // }, [recruiterMessages]);

    useEffect(() => {
        dispatch(FetchRecruiterMessagesAction({ recruiter_id: user._id }));
    }, [])

    useEffect(() => {
        dispatch(FetchRecruiterMessagesAction({ recruiter_id: user._id }));
    }, [recruiterMessages])

    useEffect(() => {
        dispatch(FetchUserProfileViewAction(id));
    }, [])

    return (
        loading ? <Loader /> :
            <div className='userprofileview'>
                <Helmet>
                    <title>User Profile View</title>
                    <meta
                        name="description"
                        content="User Profile View"
                    />
                </Helmet>

                <div className='userprofileview_left'>
                    <div className='userprofileview_left_avatar'>
                        <img src={userProfileViewData.userPhotoUrl} />
                        <div className='userprofileview_left_avatar_details'>
                            <h3>{userProfileViewData.name}</h3>
                            <h4>{userProfileViewData.headline}</h4>
                        </div>
                    </div>
                    <div className='userprofileview_left_links'>
                        <div className='userprofileview_left_links_box'>
                            <span><IoMail /></span>
                            <div>
                                <h3>Email</h3>
                                <h4>{userProfileViewData.email}</h4>
                            </div>
                        </div>
                        <div className='userprofileview_left_links_box'>
                            <span><ImPhoneHangUp /></span>
                            <div>
                                <h3>Phone</h3>
                                <h4>{userProfileViewData.phone || 123456789}</h4>
                            </div>
                        </div>
                        <div className='userprofileview_left_links_box'>
                            <span><FaBirthdayCake /></span>
                            <div>
                                <h3>Date of Birth</h3>
                                <h4>{userProfileViewData.dob || "12-12-2022"}</h4>
                            </div>
                        </div>
                        <div className='userprofileview_left_links_box'>
                            <span><GoMarkGithub /></span>
                            <div>
                                <h3>Github</h3>
                                <h4>{userProfileViewData.githublink || "-"}</h4>
                            </div>
                        </div>
                        <div className='userprofileview_left_links_box'>
                            <span><RxLinkedinLogo /></span>
                            <div>
                                <h3>LinkedIn</h3>
                                <h4>{userProfileViewData.linkedinlink || "-"}</h4>
                            </div>
                        </div>
                        <div className='userprofileview_left_links_box'>
                            <span><RiProfileFill /></span>
                            <div>
                                <h3>Profile Link</h3>
                                <h4>{userProfileViewData.profilelink || "-"}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='userprofileview_left_education'>
                        <div className='userprofile_education_heading'>
                            <h3>Education</h3>
                        </div>
                        <div className='userprofileview_left_education_box'>
                            {
                                userProfileViewData.education?.map((edu, i) => (
                                    <div className='userprofileview_left_education_box_single'>
                                        <div className='userprofileview_left_education_box_single_left'>
                                            <img src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
                                            <div>
                                                {
                                                    edu.college ? <h2>{edu.college}</h2> : <h4>Enter your college</h4>
                                                }
                                                {
                                                    edu.degree ? <h3>{edu.degree}</h3> : <h4>Enter your degree</h4>
                                                }
                                                {
                                                    <span>{edu.start ? edu.start : "--/--/--"} - {edu.end ? edu.end : "--/--/--"}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Experience */}
                    <div className='userprofileview_left_education'>
                        <div className='userprofileview_left_education_heading'>
                            <h3>Experience</h3>
                        </div>
                        <div className='userprofileview_left_education_box'>
                            {
                                userProfileViewData.experience?.map((exp, i) => (
                                    <div className='userprofileview_left_education_box_single'>
                                        <div className='userprofileview_left_education_box_single_left'>
                                            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
                                            <div>
                                                {
                                                    exp.designation ? <h2>{exp.designation}</h2> : <h4>Enter your designation</h4>
                                                }
                                                {
                                                    exp.company ? <h3>{exp.company}</h3> : <h4>Enter your company</h4>
                                                }
                                                {
                                                    <span>{exp.start ? exp.start : "--/--/--"} - {exp.end ? exp.end : "--/--/--"}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='userprofileview_right'>
                    <div className='userprofileview_right_name'>
                        <img src={userProfileViewData.userPhotoUrl} />
                        <div className='userprofileview_right_name_status'>
                            <h3>{userProfileViewData.name}</h3>
                            {
                                userProfileViewData.isActive ? (
                                    <p>Active</p>
                                ) : (
                                    <p>{moment(userProfileViewData.lastSeen).calendar()}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className='userprofileview_right_messages'>
                        {
                            recruiterMessages?.messagesList?.map((user) => (
                                user.user_id === userProfileViewData._id ?
                                    user.messages?.map((message) => (
                                        <div className={message.from === userProfileViewData._id ? "userprofileview_right_messages_user" : "userprofileview_right_messages_recruiter"}>
                                            <p>{message?.message}</p>
                                        </div>
                                    )) : <></>
                            ))
                        }
                    </div>
                    <div className='userprofileview_right_send'>
                        <input type="text" ref={messageRef} placeholder="Type message..." />
                        <button onClick={() => sendMessageHandler()}>Send</button>
                    </div>
                </div>
            </div>
    )
}

export default UserProfileView