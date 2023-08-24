/* eslint-disable react-hooks/exhaustive-deps */
import Peer from 'simple-peer'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sidebar } from '../components/sidebar'
import { Call } from '../components/chat/call/Call'
import SocketContext from '../context/socketContext'
import { updateMessages } from '../features/chatSlice'
import { getConversations } from '../features/chatSlice'
import { ChatContainer, WhatsappHome } from '../components/chat'
import { getConversationId, getConversationName, getConversationPicture } from '../utils/chat'

const callData = {
  socketId: '',
  receivingCall: false,
  callEnded: false,
  name: '',
  picture: ''
}

function Home({ socket }) {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  const [stream, setStream] = useState()
  const [show, setShow] = useState(false);
  const [call, setCall] = useState(callData)
  const [typing, setTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [callAccepted, setCallAccepted] = useState(false)
  const [totalSecInCall, setTotalSecInCall] = useState(0)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const { socketId } = call

  useEffect(() => {
    socket.emit('join', user._id)

    socket.on('get-online-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  useEffect(() => {
    setupMedia()
    socket.on('setup socket', (id) => {
      setCall({...call, socketId: id})
    })
    socket.on('call user', (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true
      })
    })
    socket.on('end call', () => {
      setShow(false)
      setCall({
        ...call,
        callEnded: true,
        receivingCall: false
      })
      myVideo.current.srcObject = null
      if (callAccepted) {
        connectionRef?.current?.destroy()
      }
    })
  }, [])

  const callUser = () => {
    enableMedia()
    setCall({ 
      ...call, 
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users)
    })
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on('signal', (data) => {
      socket.emit('call user', {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture
      })
    })
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream
    })
    socket.on('call accepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }

  const answerCall = () => {
    enableMedia()
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })
    peer.on('signal', (data) => {
      socket.emit('answer call', {
        signal: data,
        to: call.socketId
      })
    })
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream
    })
    peer.signal(call.signal)
    connectionRef.current = peer
  }

  const endCall = () => {
    setShow(false)
    setCall({
      ...call,
      callEnded: true
    })
    myVideo.current.srcObject = null
    socket.emit('end call', call.socketId)
    connectionRef?.current?.destroy()
  }

  const setupMedia = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      setStream(stream)
    })
  }

  const enableMedia = () => {
    myVideo.current.srcObject = stream
  }

  useEffect(() => {
    socket.on('receive message', (message) => {
      dispatch(updateMessages(message))
    })

    socket.on('typing', (conversation) => setTyping(conversation))

    socket.on('stop typing', () => setTyping(false))
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token))
    }
  }, [user, dispatch])

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex py-[19px]">
        <Sidebar onlineUsers={onlineUsers} typing={typing} />

        {
          activeConversation._id ? (
              <ChatContainer onlineUsers={onlineUsers} typing={typing} callUser={callUser} />
            ) : (
              <WhatsappHome />
            )
        }
      </div>

      <Call 
        call={call} 
        stream={stream}
        setCall={setCall} 
        myVideo={myVideo}
        userVideo={userVideo}
        callAccepted={callAccepted} 
        answerCall={answerCall}
        show={show}
        endCall={endCall}
        totalSecInCall={totalSecInCall}
        setTotalSecInCall={setTotalSecInCall}
      />
    </div>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default HomeWithSocket
