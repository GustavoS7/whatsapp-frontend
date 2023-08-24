import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"

import { Typing } from "./Typing"
import { Message } from "./Message"
import { FileMessage } from "./files/FileMessage"

export function ChatMessages ({ typing }) {

  const { user } = useSelector((state) => state.user)
  const { messages, activeConversation } = useSelector((state) => state.chat)

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
            <>
              {
                message.files.length > 0 ? (
                  message.files.map((file) => (
                    <FileMessage 
                      FileMessage={file}
                      message={message} 
                      key={message._id} 
                      me={user._id === message.sender._id} 
                    />
                  ))
                ) : (
                  null
                )
              }
              {
                message.message.length > 0 ? (
                  <Message 
                    message={message} 
                    key={message._id} 
                    me={user._id === message.sender._id} 
                  />
                ) : (
                  null
                )
              }
            </>
          ))
        }
        {typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  )
}