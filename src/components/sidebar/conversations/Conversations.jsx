import { useSelector } from "react-redux"

import Conversation from "./Conversation"
import { checkOnlineStatus } from "../../../utils/chat"

export function Conversations ({ onlineUsers, typing }) {
  const { conversations, activeConversation } = useSelector((state) => state.chat)

  const { user } = useSelector((state) => state.user)

  return (
    <div className="conversations scrollbar">
      <ul>
        {
          conversations && conversations
          .filter((c) => c.latestMessage || c._id === activeConversation._id)
          .map((conversation) => {
            const check = checkOnlineStatus(onlineUsers, user, conversation.users)
            return (
              <Conversation 
                conversation={conversation} 
                key={conversation._id} 
                online={check ? true : false} 
                typing={typing}
              />
            )
          })
        }
      </ul>
    </div>
  )
}
