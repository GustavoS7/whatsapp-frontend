import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sidebar } from "../components/sidebar"
import { getConversations } from '../features/chatSlice'

export function Home() {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token))
    }
  }, [user, dispatch])

  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <Sidebar />
      </div>
    </div>
  )
}
