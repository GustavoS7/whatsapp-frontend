import { useSelector } from "react-redux"

import { Conversation } from "./Conversation"

export function Conversations () {
  const { conversations } = useSelector((state) => state.chat)

  return (
    <div className="conversations scrollbar">
      <ul>
      {
        conversations && conversations.map((conversation, index) => (
          <Conversation conversation={conversation} key={conversation._id} />
        ))
      }
      </ul>
    </div>
  )
}
