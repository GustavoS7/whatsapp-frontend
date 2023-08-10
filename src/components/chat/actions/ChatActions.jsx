import { useRef, useState } from "react"

import { SendIcon } from "../../../svg"
import { EmojiPickerApp, Input } from "./"
import { Attachments } from "./Attachments"
import { useDispatch, useSelector } from "react-redux"
import { send_message } from "../../../features/chatSlice"
import { ClipLoader } from "react-spinners"

export function ChatActions () {

  const dispatch = useDispatch()

  const [showEmoji, setShowEmoji] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [loading, setLoading] = useState(false)
  const { activeConversation, status } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)
  const [message, setMessage] = useState("")

  const textRef = useRef()

  const values = {
    message,
    conversation_id: activeConversation._id,
    files: [],
    token: user.token
  }

  const sendMessageHanlder = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    await dispatch(send_message(values))

    setMessage("")
    setLoading(false)
  }

  return (
    <form 
      onSubmit={(evt) => sendMessageHanlder(evt)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center ga-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerApp 
            message={message}
            setMessage={setMessage}
            textRef={textRef} 
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowEmoji={setShowEmoji}
          />
        </ul>
        <Input 
          message={message}
          setMessage={setMessage}
          textRef={textRef}
        />
        <button type="submit" className="btn">
          {
            status === 'loading' && loading
            ? <ClipLoader color="#e9edef" size={25} />
            : <SendIcon className="dark:fill-dark_svg_1" />
          }
        </button>
      </div>
    </form>
  )
}
