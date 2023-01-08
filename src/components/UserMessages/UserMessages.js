import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchAllRecruiterMessages, FetchRecruiterMessagesAction, sendMessageAction } from '../../store/asyncMethods/MessagesMethod';
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";

// Scss import
import "./usermessages.scss"

const UserMessages = () => {
    const dispatch = useDispatch()
    const messageRef = useRef(null)
    const { user, loading } = useSelector(state => state.auth)
    const { recruiterMessages, allRecruiterMessages } = useSelector(state => state.messages)

    const fetchUserMessages = (recruiter_id) => {
        dispatch(FetchRecruiterMessagesAction({ recruiter_id }))
    }

    const sendMessageHandler = () => {
        dispatch(sendMessageAction({ from: recruiterMessages.recruiter_id, to: user._id, messageContent: messageRef.current.value, sender: user._id }))
        messageRef.current.value = ''
    }

    // const messagesBottomScroll = useRef(null);

    // const scrollToBottom = () => {
    //     messagesBottomScroll.current?.scrollIntoView({ behavior: "smooth" })
    //   }

    //   useEffect(() => {
    //     scrollToBottom()
    //   }, [recruiterMessages]);

    useEffect(() => {
        dispatch(FetchAllRecruiterMessages());
    }, [])

    // useEffect(() => {
    //     console.log("cc")
    //     dispatch(FetchRecruiterMessagesAction({recruiter_id: "63b5ad9a3d69dd82b0b8e8db" }));
    // }, [recruiterMessages])

    return (
        loading ? <Loader /> :
            <div className='usermessages'>
                <Helmet>
                    <title>User Messages</title>
                    <meta
                        name="description"
                        content="User Messages"
                    />
                </Helmet>
                <div className='usermessages_left'>
                    {
                        allRecruiterMessages?.map((recruiter) => (
                            recruiter.messagesList?.map((userMessages) => (
                                userMessages.user_id === user._id ? (
                                    <h3 onClick={() => fetchUserMessages(recruiter.recruiter_id)}>{recruiter.recruiter_id}</h3>
                                ) : ""
                            ))
                        ))
                    }
                </div>
                <div className='usermessages_right'>
                    <div className='usermessages_right_name'>
                        <h3>Name</h3>
                    </div>
                    <div className='usermessages_right_messages'>
                        {
                            recruiterMessages?.messagesList?.map((userMessages) => (
                                userMessages.user_id === user._id ?
                                    userMessages.messages?.map((message) => (
                                        <div className={message.from === user._id ? "usermessages_right_messages_user" : "usermessages_right_messages_recruiter"}>
                                            <p>{message?.message}</p>
                                        </div>
                                    )) : <></>
                            ))
                        }
                        {/* <div ref={messagesBottomScroll} /> */}
                    </div>

                    <div className='userprofileview_right_send'>
                        <input type="text" ref={messageRef} placeholder="Type message..." />
                        <button onClick={() => sendMessageHandler()}>Send</button>
                    </div>
                    {/* <input type="text" name="messageContent" value={messageContent} placeholder="Type message..." onChange={(e) => setMessageContent(e.target.value)} /> */}
                    {/* <button onClick={() => sendMessageHandler()}>Send</button> */}
                </div>
            </div>
    )
}

export default UserMessages