import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Add } from "./Add"
import { SendIcon } from "../../../../svg"
import { uploadFiles } from "../../../../utils/upload"
import { send_message } from "../../../../features/chatSlice"
import SocketContext from "../../../../context/socketContext"

function HandleAndSend ({ activeIndex, setActiveIndex, message, socket }) {

  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => state.user)
  const { files, activeConversation } = useSelector((state) => state.chat)

  const { token } = user

  const sendMessageHandler = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    const uploaded_files = await uploadFiles(files)

    const values = {
      token,
      message,
      conversation_id: activeConversation._id,
      files: uploaded_files.length > 0 ? uploaded_files : []
    }

    const newMsg = await dispatch(send_message(values))

    socket.emit('send message', newMsg.payload)

    setLoading(false)
  }

  return (
    <div className="w-[97%] items-center flex justify-between mt-2 border-t dark:border-dark_border_2">
      <span></span>

      <div className="flex gap-x-2">
        {
          files.map((file, idx) => (
            <div 
              key={idx} 
              className={`
                w-14 h-14 border mt-2 dark:border-white rounded-md overflow-hidden cursor-pointer
                ${activeIndex === idx ? 'border-[3px] !border-green_1' : ''}
              `} 
              onClick={() => setActiveIndex(idx)}
            >
              {
                file.type === 'IMAGE' ? (
                  <img src={file.fileData} alt="" className="w-full h-full object-cover" />
                ) : (
                  <img src={`../../../../images/file/${file.type}.png`} alt="" className="w-8 h-10 mt-1.5 ml-2.5" />
                )
              }
            </div>
          ))
        }
        
        <Add setActiveIndex={setActiveIndex} /> 
      </div>
      
      <div 
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={(evt) => sendMessageHandler(evt)}
      >
        <SendIcon className="fill-white" />
      </div>
    </div>
  )
}

const HandleAndSendWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default HandleAndSendWithContext
