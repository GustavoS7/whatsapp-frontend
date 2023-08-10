import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sidebar } from '../components/sidebar'
import { WhatsappHome } from '../components/chat'
import { getConversations } from '../features/chatSlice'

export function Home() {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token))
    }
  }, [user, dispatch])

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar />

        {
          activeConversation._id ? (
              null
            ) : (
            <WhatsappHome />
          )
        }
      </div>
    </div>
  )
}
