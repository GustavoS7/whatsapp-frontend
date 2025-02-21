import { useSelector } from "react-redux"

import Conversation from "./Conversation"
import { checkOnlineStatus } from "../../../utils/chat"

export function Conversations ({ onlineUsers, typing }) {

  const { user } = useSelector((state) => state.user)
  const { conversations, activeConversation } = useSelector((state) => state.chat)

  return (
    <div className="conversations scrollbar">
      <ul>
        {
          conversations && conversations
          .filter((c) => c.latestMessage || c._id === activeConversation._id || c.isGroup === true)
          .map((conversation) => {
            const check = checkOnlineStatus(onlineUsers, user, conversation.users)
            return (
              <Conversation
                conversation={conversation}
                key={conversation._id}
                online={!conversation.isGroup && check ? true : false}
                typing={typing}
              />
            )
          })
        }
      </ul>
    </div>
  )
}
