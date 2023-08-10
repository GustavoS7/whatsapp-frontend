import { useDispatch, useSelector } from 'react-redux'
import { dateHanlder } from '../../../utils/date'
import { open_create_conversation } from '../../../features/chatSlice'
import { getConversationId } from '../../../utils/chat'

export function Conversation ({ conversation }) {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const values = {
    receiver_id: getConversationId(user, conversation.users),
    token: user.token
  }

  const openConversation = () => {
    dispatch(open_create_conversation(values))
  }

  return (
    <li 
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
      onClick={() => openConversation()}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img 
              src={conversation.picture} 
              alt={conversation.name} 
              className="w-full h-full" 
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {conversation.name}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark-text-2">
                  <p>
                    {
                      conversation.latestMessage?.message.length > 25 
                      ? `${conversation.latestMessage?.message.substring(0,25)}...` 
                      : conversation.latestMessage?.message
                    }
                  </p>
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
