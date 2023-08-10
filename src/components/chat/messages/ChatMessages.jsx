import { useSelector } from "react-redux"

import { Message } from "./Message"
import { useEffect, useRef } from "react"

export function ChatMessages () {

  const { messages } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)

  const endRef = useRef()

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {
          messages && messages.map((message) => (
            <Message 
              message={message} 
              key={message._id} 
              me={user._id === message.sender._id} 
            />
          ))
        }
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  )
}