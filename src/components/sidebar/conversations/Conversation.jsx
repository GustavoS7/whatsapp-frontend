import { useDispatch, useSelector } from 'react-redux'

import { dateHanlder } from '../../../utils/date'
import { capitalize } from '../../../utils/string'
import SocketContext from '../../../context/socketContext'
import { open_create_conversation } from '../../../features/chatSlice'
import { getConversationId, getConversationName, getConversationPicture } from '../../../utils/chat'

function Conversation ({ conversation, socket, online, typing }) {

  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  const values = {
    receiver_id: getConversationId(user, conversation.users),
    token: user.token
  }

  const openConversation = async () => {
    const newConversation = await dispatch(open_create_conversation(values))
    socket.emit('join conversation', newConversation.payload._id)
  }

  return (
    <li
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${conversation._id === activeConversation._id ? '' : 'dark:bg-dark_bg_2'} cursor-pointer dark:text-dark_text_1 px-[10px] ${conversation._id === activeConversation._id ? 'dark:bg-dark_hover_1' : ''}`}
      onClick={() => openConversation()}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${online ? 'online' : ''}`}>
            <img
              src={getConversationPicture(user, conversation.users)}
              alt={getConversationName(user, conversation.users)}
              className="w-full h-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {capitalize(getConversationName(user, conversation.users))}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark-text-2">
                  {
                    typing === conversation._id ? (
                      <p className='text-green_1'>
                        Typing...
                      </p>
                    ) : (
                      <p>
                        {
                          conversation.latestMessage?.message.length > 25
                          ? `${conversation.latestMessage?.message.substring(0,25)}...`
                          : conversation.latestMessage?.message
                        }
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {
              conversation.latestMessage?.createdAt
              ? dateHanlder(conversation.latestMessage?.createdAt)
              : ''
            }
          </span>
        </div>
      </div>
    </li>
  )
}

const ConversationWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default ConversationWithContext
