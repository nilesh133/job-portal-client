import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   recruiterMessages: '',
   allRecruiterMessages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setRecruiterMessages: (state, action) => {
            state.recruiterMessages =  action.payload
            // console.log(state.recruiterMessages)
        },
        setAllRecruiterMessages: (state, action) => {
            state.allRecruiterMessages = action.payload
        }
    }
})

export const {setRecruiterMessages, setAllRecruiterMessages} = messagesSlice.actions;
export default messagesSlice.reducer;