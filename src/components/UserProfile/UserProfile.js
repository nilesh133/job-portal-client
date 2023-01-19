import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserProfileAction } from "../../store/asyncMethods/UserMethod"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Material UI Imports
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

// Scss import
import "./userprofile.scss";

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

const UserProfile = () => {
  const dispatch = useDispatch()
  const { user: { name, _id, email, headline, phone, dob, githublink, linkedinlink, userPhotoUrl, education, experience }, loading } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.auth)

  const [profile, setProfile] = useState({
    id: _id,
    name: name,
    email: email,
    headline: headline,
    phone: phone,
    dob: dob,
    githublink: githublink,
    linkedinlink: linkedinlink,
    userPhotoUrl: userPhotoUrl,
    education: education,
    experience: experience
  })

  const [openModal, setOpenModal] = useState({
    type: '',
    currmodalidx: ''
  });

  const handleOpenModal = (type, i) => {
    setOpenModal({
      type: type,
      currmodalidx: i
    });
  };

  const handleCloseModal = () => {
    setOpenModal({
      type: '',
      currmodalidx: ''
    });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  // Brief handler
  const handleBriefChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }


  // Education handlers
  const addNewEducation = () => {
    const newProfileEducation = [...profile.education, {
      id: profile.education.length,
      degree: "",
      college: "",
      field: "",
      start: "",
      end: "",
      grades: "",
    }]

    setProfile({ ...profile, education: newProfileEducation })
  }

  const handleEducationChange = (e, i) => {
    let newProfileEducation = []
    profile.education.map((edu, idx) => {
      if (idx === i) {
        newProfileEducation.push({
          ...edu,
          [e.target.name]: e.target.value
        })
      }
      else {
        newProfileEducation.push(edu)
      }
    })
    setProfile({ ...profile, education: newProfileEducation })
  }

  const saveEducation = () => {
    console.log(profile)
    dispatch(UpdateUserProfileAction(profile))
    handleCloseModal()
  }


  // Experience handler
  const addNewExperience = () => {
    const newProfileExperience = [...profile.experience, {
      id: profile.experience.length,
      company: "",
      location: "",
      designation: "",
      start: "",
      end: ""
    }]

    setProfile({ ...profile, experience: newProfileExperience })
  }

  const handleExperienceChange = (e, i) => {
    let newProfileExperience = []
    profile.experience.map((exp, idx) => {
      if (idx === i) {
        newProfileExperience.push({
          ...exp,
          [e.target.name]: e.target.value
        })
      }
      else {
        newProfileExperience.push(exp)
      }
    })
    setProfile({ ...profile, experience: newProfileExperience })
  }

  const saveExperience = () => {
    dispatch(UpdateUserProfileAction(profile))
    handleCloseModal()
  }

  // User Profile photo handler
  const [userPhotoName, setUserPhotoName] = useState('');
  const [userPhotoPreview, setUserPhotoPreview] = useState('');

  const handleProfilePhotoChange = (e) => {
    if (e.target.files.length !== 0) {
      setUserPhotoName(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotoPreview(reader.result)
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const updateUserPhoto = (e) => {
    const userPhotoRef = ref(storage, `allUserPhoto/${userPhotoName.name + v4()}`);
    uploadBytes(userPhotoRef, userPhotoName).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(UpdateUserProfileAction({
          id: profile.id,
          name: profile.name,
          email: profile.name,
          userPhotoUrl: url,
          education: profile.education,
          experience: profile.experience
        }))
      });
    })
    handleCloseModal();
  }

  return (
    loading ? <Loader /> :
      <div className='userprofile'>

        {/* User cover photo */}
        <div className='userprofile_coverphoto'>
          <img src="https://images.unsplash.com/photo-1595981234969-8259b94fde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
        </div>

        {/* User Profile Photo */}
        <div className='userprofile_profilephoto'>
          <div className='userprofile_profilephoto_image'>
            <img src={user.userPhotoUrl} />
            <div className="userprofile_profilephoto_image_button" onClick={() => handleOpenModal("userPhotoUrl")}><span><IoMdCamera /></span></div>
          </div>
          <Modal
            hideBackdrop
            open={openModal.type === "userPhotoUrl"}
            onClose={handleCloseModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 300, height: 300 }}>
              <div className='userprofile_profilephoto_modal'>
                <img className='userprofile_profilephoto_modal_img' src={userPhotoPreview ? userPhotoPreview : user.userPhotoUrl} />
                <input type="file" onChange={(e) => handleProfilePhotoChange(e)} />
                <div>
                  <button className='userprofile_profilephoto_modal_button' onClick={handleCloseModal}>Close</button>
                  <button className='userprofile_profilephoto_modal_button' onClick={updateUserPhoto}>Save</button>
                </div>
              </div>

            </Box>
          </Modal>
        </div>

        {/* User brief info*/}
        <div className='userprofile_briefinfo'>
          <div className='userprofile_briefinfo_headline'>
            <div>
              <h3>{profile.name}</h3>
              <h4>{profile.headline ? profile.headline : "React JS Developer, DSA, Java"}</h4>
            </div>
            <div className='userprofile_education_box_single_right' onClick={() => handleOpenModal("brief")}><MdEdit /></div>
          </div>
          <Modal
            hideBackdrop
            open={openModal.type === "brief"}
            onClose={handleCloseModal}
            aria-labelledby="child-modal-title"
            className="userprofile_modal"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 500 }} className="userprofile_modal_box">
              <div className='userprofile_modal_box_field'>
                <h3>Name</h3>
                <input type="text" placeholder='Enter name' name="name" value={profile.name} onChange={(e) => handleBriefChange(e)} />
              </div>
              <div className='userprofile_modal_box_field'>
                <h3>Headline</h3>
                <input type="text" placeholder='Enter headline' name="headline" value={profile.headline} onChange={(e) => handleBriefChange(e)} />
              </div>
              <div className='userprofile_modal_box_field'>
                <h3>Phone</h3>
                <input type="number" placeholder='Enter phone' name="phone" value={profile.phone} onChange={(e) => handleBriefChange(e)} />
              </div>
              <div className='userprofile_modal_box_field'>
                <h3>Date of Birth</h3>
                <input type="date" placeholder='Enter dob' name="dob" value={profile.dob} onChange={(e) => handleBriefChange(e)} />
              </div>
              <div className='userprofile_modal_box_field'>
                <h3>Github</h3>
                <input type="text" placeholder='Enter Github link' name="githublink" value={profile.githublink} onChange={(e) => handleBriefChange(e)} />
              </div>
              <div className='userprofile_modal_box_field'>
                <h3>LinkedIn</h3>
                <input type="text" placeholder='Enter LinkedIn link' name="linkedinlink" value={profile.linkedinlink} onChange={(e) => handleBriefChange(e)} />
              </div>
              <button onClick={handleCloseModal}>Close</button>
              <button onClick={saveEducation}>Save</button>
            </Box>
          </Modal>
          <div className='userprofile_briefinfo_links'>

            <div className='userprofile_briefinfo_links_box'>
              <span><IoMail /></span>
              <div>
                <h3>Email</h3>
                <h4>{profile.email}</h4>
              </div>
            </div>
            <div className='userprofile_briefinfo_links_box'>
              <span><ImPhoneHangUp /></span>
              <div>
                <h3>Phone</h3>
                <h4>{profile.phone || 123456789}</h4>
              </div>
            </div>
            <div className='userprofile_briefinfo_links_box'>
              <span><FaBirthdayCake /></span>
              <div>
                <h3>Date of Birth</h3>
                <h4>{profile.dob || "12-12-2022"}</h4>
              </div>
            </div>
            <div className='userprofile_briefinfo_links_box'>
              <span><GoMarkGithub /></span>
              <div>
                <h3>Github</h3>
                <h4>{profile.githublink || "-"}</h4>
              </div>
            </div>
            <div className='userprofile_briefinfo_links_box'>
              <span><RxLinkedinLogo /></span>
              <div>
                <h3>LinkedIn</h3>
                <h4>{profile.linkedinlink || "-"}</h4>
              </div>
            </div>
            <div className='userprofile_briefinfo_links_box'>
              <span><RiProfileFill /></span>
              <div>
                <h3>Profile Link</h3>
                <h4>{profile.profilelink || "-"}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className='userprofile_education'>
          <div className='userprofile_education_heading'>
            <h3>Education</h3>
            <button onClick={() => addNewEducation()}>Add new</button>
          </div>
          <div className='userprofile_education_box'>
            {
              profile.education?.map((edu, i) => (
                <div className='userprofile_education_box_single'>
                  <div className='userprofile_education_box_single_left'>
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
                  <div className='userprofile_education_box_single_right' onClick={() => handleOpenModal("edu", i)}><MdEdit /></div>
                  <Modal
                    hideBackdrop
                    open={openModal.type === "edu" && openModal.currmodalidx === i}
                    onClose={handleCloseModal}
                    aria-labelledby="child-modal-title"
                    className="userprofile_modal"
                    aria-describedby="child-modal-description"
                  >
                    <Box sx={{ ...style, width: 500 }} className="userprofile_modal_box">
                      <div className='userprofile_modal_box_field'>
                        <h3>College name</h3>
                        <input type="text" name="college" value={edu?.college} placeholder="Enter college" onChange={(e) => handleEducationChange(e, i)} />
                      </div>
                      <div className='userprofile_modal_box_field'>
                        <h3>Field</h3>
                        <input type="text" name="field" value={edu?.field} placeholder="Enter field" onChange={(e) => handleEducationChange(e, i)} />
                      </div>
                      <div className='userprofile_modal_box_field'>
                        <h3>Degree</h3>
                        <input type="text" name="degree" value={edu?.degree} placeholder="Enter degree" onChange={(e) => handleEducationChange(e, i)} />
                      </div>
                      <div className='userprofile_modal_box_field'>
                        <h3>Grades</h3>
                        <input type="text" name="grades" value={edu?.grades} onChange={(e) => handleEducationChange(e, i)} placeholder="Grades" />
                      </div>
                      <div className='userprofile_modal_box_field'>
                        <h3>Start date</h3>
                        <input type="date" name="start" value={edu?.start} onChange={(e) => handleEducationChange(e, i)} placeholder="Start date" />
                      </div>
                      <div className='userprofile_modal_box_field'>
                        <h3>End date</h3>
                        <input type="date" name="end" value={edu?.end} onChange={(e) => handleEducationChange(e, i)} placeholder="End date" />
                      </div>
                      <button onClick={handleCloseModal}>Close</button>
                      <button onClick={saveEducation}>Save</button>
                    </Box>
                  </Modal>
                </div>
              ))
            }
          </div>
        </div>

        {/* Experience */}
        <div className='userprofile_education'>
          <div className='userprofile_education_heading'>
            <h3>Experience</h3>
            <button onClick={() => addNewExperience()}>Add new</button>
          </div>
          <div className='userprofile_education_box'>
            {
              profile.experience?.map((exp, i) => (
                <div className='userprofile_education_box_single'>
                  <div className='userprofile_education_box_single_left'>
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
                  <div className='userprofile_education_box_single_right' onClick={() => handleOpenModal("exp", i)}><MdEdit /></div>
                  <Modal
                    hideBackdrop
                    open={openModal.type === "exp" && openModal.currmodalidx === i}
                    onClose={handleCloseModal}
                    aria-labelledby="child-modal-title"
                    className="userprofile_modal"
                    aria-describedby="child-modal-description"
                  >
                    <Box sx={{ ...style, width: 500 }} className="userprofile_modal_box">
                      <div className='userprofile_modal_box_field'>
                        <h3>Company Name</h3>
                        <input type="text" name="company" value={exp?.compnay} placeholder="Enter company" onChange={(e) => handleExperienceChange(e, i)} />
                      </div>

                      <div className='userprofile_modal_box_field'>
                        <h3>Location</h3>
                        <input type="text" name="location" value={exp?.location} placeholder="Enter location" onChange={(e) => handleExperienceChange(e, i)} />
                      </div>

                      <div className='userprofile_modal_box_field'>
                        <h3>Designation</h3>
                        <input type="text" name="designation" value={exp?.designation} placeholder="Enter designation" onChange={(e) => handleExperienceChange(e, i)} />
                      </div>

                      <div className='userprofile_modal_box_field'>
                        <h3>Start date</h3>
                        <input type="date" name="start" value={exp?.start} onChange={(e) => handleExperienceChange(e, i)} placeholder="Start date" />
                      </div>

                      <div className='userprofile_modal_box_field'>
                        <h3>End date</h3>
                        <input type="date" name="end" value={exp?.end} onChange={(e) => handleExperienceChange(e, i)} placeholder="End date" />
                      </div>

                      <button onClick={handleCloseModal}>Close</button>
                      <button onClick={saveExperience}>Save</button>
                    </Box>
                  </Modal>
                </div>
              ))
            }
          </div>
        </div>

        {/* Experience Old*/}
        {/* <div>
        {
          profile.experience?.map((exp, i) => (
            <div>
              <div>{exp?.company}</div>
              <div>{exp?.location}</div>
              <Button onClick={() => handleOpenModal("exp", i)}>{`Experience${i}`}</Button>
              <Modal
                hideBackdrop
                open={openModal.type === "exp" && openModal.currmodalidx === i}
                onClose={handleCloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style, width: 500, height: 300 }}>
                  <input type="text" name="company" value={exp?.compnay} placeholder="Enter company" onChange={(e) => handleExperienceChange(e, i)} />
                  <input type="text" name="location" value={exp?.location} placeholder="Enter location" onChange={(e) => handleExperienceChange(e, i)} />
                  <input type="text" name="designation" value={exp?.designation} placeholder="Enter designation" onChange={(e) => handleExperienceChange(e, i)} />
                  <input type="date" name="start" value={exp?.start} onChange={(e) => handleExperienceChange(e, i)} placeholder="Start date" />
                  <input type="date" name="end" value={exp?.end} onChange={(e) => handleExperienceChange(e, i)} placeholder="End date" />
                  <Button onClick={handleCloseModal}>Close Child Modal</Button>
                  <Button onClick={saveExperience}>Save</Button>
                </Box>
              </Modal>
            </div>
          ))
        }
        <div>
          <button onClick={() => addNewExperience()}>Add new exp</button>
        </div>
      </div> */}
      </div>
  )
}

export default UserProfile

// cover photo remaining
// headline remaining