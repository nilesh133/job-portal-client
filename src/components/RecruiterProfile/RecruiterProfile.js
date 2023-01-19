import React, { useState } from 'react'
import { IoMdCamera } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import "./recruiterprofile.scss";

// Material UI Imports
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UpdateRecruiterLogoAction, UpdateRecruiterAboutAction } from '../../store/asyncMethods/UserMethod';

import moment from "moment";

const RecruiterProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    console.log(user)

    const [recruiterPhotoName, setRecruiterPhotoName] = useState('');
    const [recruiterPhotoPreview, setRecruiterPhotoPreview] = useState('');

    const [aboutCompany, setAboutCompany] = useState(user.aboutCompany);

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

    const handleProfilePhotoChange = (e) => {
        if (e.target.files.length !== 0) {
            setRecruiterPhotoName(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setRecruiterPhotoPreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const updateRecruiterPhoto = (e) => {
        const recruiterPhotoRef = ref(storage, `allUserPhoto/${recruiterPhotoName.name + v4()}`);
        uploadBytes(recruiterPhotoRef, recruiterPhotoName).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                dispatch(UpdateRecruiterLogoAction({
                    id: user._id,
                    companyLogo: url
                }))
            });
        })
        handleCloseModal();
    }

    const updateRecruiterAbout = () => {
        dispatch(UpdateRecruiterAboutAction({aboutCompany, id: user._id}))
        handleCloseModal()
    }

    return (
        <div className='recruiterprofile'>
            <div className='recruiterprofile_logo'>
                <div className='recruiterprofile_logo_image'>
                    <img src={user.companyLogo} />
                    <div className="recruiterprofile_logo_image_button" onClick={() => handleOpenModal("companyLogo")}><span><IoMdCamera /></span></div>
                </div>
                <Modal
                    hideBackdrop
                    open={openModal.type === "companyLogo"}
                    onClose={handleCloseModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 300, height: 300 }}>
                        <div className='recruiterprofile_logo_modal'>
                            <img className='recruiterprofile_logo_modal_img' src={recruiterPhotoPreview ? recruiterPhotoPreview : user.companyLogo} />
                            <input type="file" onChange={(e) => handleProfilePhotoChange(e)} />
                            <div>
                                <button className='recruiterprofile_logo_modal_button' onClick={handleCloseModal}>Close</button>
                                <button className='recruiterprofile_logo_modal_button' onClick={updateRecruiterPhoto}>Save</button>
                            </div>
                        </div>

                    </Box>
                </Modal>
                <h3>{user.name}</h3>
            </div>
            <div className='recruiterprofile_joined'>
                <h3>Joined on</h3>
                <p>{moment(user.createdAt).add(0, 'days').calendar()}</p>
            </div>
            <div className='recruiterprofile_about'>
                <div className='recruiterprofile_about_heading'>
                    <h3>About Company</h3>
                    <button onClick={() => handleOpenModal("companyAbout")}>Edit</button>
                </div>
                <p>{user.aboutCompany}</p>
                <Modal
                    hideBackdrop
                    open={openModal.type === "companyAbout"}
                    onClose={handleCloseModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 600, height: 220, padding: "0", borderRadius: "1rem", border: "none" }}>
                        <div className='recruiterprofile_about_modal'>
                            <textarea value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)}></textarea>
                            <button className='recruiterprofile_about_modal_closebutton' onClick={handleCloseModal}>Close</button>
                            <button className='recruiterprofile_about_modal_savebutton' onClick={() => updateRecruiterAbout()}>Save</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default RecruiterProfile