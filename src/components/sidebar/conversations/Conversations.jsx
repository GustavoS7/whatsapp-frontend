import { useSelector } from "react-redux"

import { Conversation } from "./Conversation"

export function Conversations () {
  const { conversations, activeConversation } = useSelector((state) => state.chat)

  console.log(conversations, activeConversation)

  return (
    <div className="conversations scrollbar">
      <ul>
        {
          conversations && conversations
          .filter((c) => c.latestMessage || c._id === activeConversation._id)
          .map((conversation) => (
            <Conversation conversation={conversation} key={conversation._id} />
          ))
        }
      </ul>
    </div>
  )
}
