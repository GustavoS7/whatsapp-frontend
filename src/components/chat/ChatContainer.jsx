import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ChatHeader } from "./header/"
import { ChatActions } from "./actions"
import { ChatMessages } from "./messages/"
import { checkOnlineStatus } from "../../utils/chat"
import { get_conversation_messages } from "../../features/chatSlice"

export function ChatContainer ({ onlineUsers, typing }) {

  const dispatch = useDispatch()

  const { activeConversation } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)

  const values = {
    token: user.token,
    conversation_id: activeConversation._id
  }

  useEffect(() => {
    if (activeConversation._id) {
      dispatch(get_conversation_messages(values))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation])

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      <div>
        <ChatHeader online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} />
        
        <ChatMessages typing={typing} />

        <ChatActions />
      </div>
    </div>
  )
}
