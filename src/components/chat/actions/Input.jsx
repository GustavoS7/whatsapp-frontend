import { useState } from "react"
import { useSelector } from "react-redux"

import SocketContext from "../../../context/socketContext"

function Input ({ message, setMessage, textRef, socket }) {

  const { activeConversation } = useSelector((state) => state.chat)

  const [typing, setTyping] = useState(false)
  
  const onChangeHanlder = (evt) => {
    setMessage(evt.target.value)
    if (!typing) {
      setTyping(true)
      socket.emit('typing', activeConversation._id)
    }

    const lastTypingTime = new Date().getTime()
    const timer = 1000

    setTimeout(() => {
      const timeNow = new Date().getTime()
      const timeDiff = timeNow - lastTypingTime

      if (timeDiff >= timer && typing) {
        socket.emit('stop typing', activeConversation._id)
        setTyping(false)
      }
    }, timer)
  }

  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHanlder}
        ref={textRef}
      />
    </div>
  )
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default InputWithSocket
