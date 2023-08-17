import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`

const initialState = {
  status: '',
  error: '',
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: []
}

export const getConversations = createAsyncThunk(
  'conversation/all', 
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })

      return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)
    }
  }
)

export const open_create_conversation = createAsyncThunk(
  'conversation/open_create', 
  async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values
    try {
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT, 
        { receiver_id }, 
        {
          headers: {
            Authorization: `bearer ${token}`
          }
        }
      )

      return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)
    }
  }
)

export const get_conversation_messages = createAsyncThunk(
  'conversation/messages', 
  async (values, { rejectWithValue }) => {
    const { token, conversation_id } = values
    try {
      const { data } = await axios.get(
        `${MESSAGE_ENDPOINT}/${conversation_id}`, 
        {
          headers: {
            Authorization: `bearer ${token}`
          }
        }
      )

      return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)
    }
  }
)

export const send_message = createAsyncThunk(
  'message/send', 
  async (values, { rejectWithValue }) => {
    const { token, message, conversation_id, files } = values
    try {
      const { data } = await axios.post(
        MESSAGE_ENDPOINT, 
        {
          message,
          conversation_id,
          files
        },
        {
          headers: {
            Authorization: `bearer ${token}`
          }
        }
      )

      return data
    } catch (error) {
      return rejectWithValue(error.response.data.error.message)
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload
    },
    updateMessages: (state, action) => {
      const conversation = state.activeConversation
      if(conversation._id === action.payload.conversation._id) {
        state.messages = [...state, action.payload]
      }

      let newConversation = {
        ...action.payload.conversation,
        latestMessage: action.payload
      }

      let newConversations = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      )

      newConversations.unshift(newConversation)
      state.conversations = newConversations
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload]
    },
    clearFiles: (state, action) => {
      state.files = []
    }
  },
  extraReducers(builder){
    builder
    .addCase(getConversations.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(getConversations.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.conversations = action.payload
    })
    .addCase(getConversations.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    .addCase(open_create_conversation.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(open_create_conversation.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.activeConversation = action.payload
      state.files = []
    })
    .addCase(open_create_conversation.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    .addCase(get_conversation_messages.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(get_conversation_messages.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.messages = action.payload
    })
    .addCase(get_conversation_messages.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    .addCase(send_message.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(send_message.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.messages = [ ...state.messages, action.payload ]
      const conversation = {...action.payload.conversation, latestMessage: action.payload}
      const newConversations = [...state.conversations].filter((c) => c._id !== conversation._id)
      newConversations.unshift(conversation)
      state.conversations = newConversations
    })
    .addCase(send_message.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  }
})

export const { setActiveConversation, updateMessages, addFiles, clearFiles } = chatSlice.actions

export default chatSlice.reducer