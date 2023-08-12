/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sidebar } from '../components/sidebar'
import SocketContext from '../context/socketContext'
import { updateMessages } from '../features/chatSlice'
import { getConversations } from '../features/chatSlice'
import { ChatContainer, WhatsappHome } from '../components/chat'

function Home({ socket }) {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  const [onlineUsers, setOnlineUsers] = useState([])
  const [typing, setTyping] = useState(false)


  useEffect(() => {
    socket.emit('join', user._id)

    socket.on('get-online-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

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
              <ChatContainer onlineUsers={onlineUsers} typing={typing} />
            ) : (
              <WhatsappHome />
            )
        }
      </div>
    </div>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default HomeWithSocket
