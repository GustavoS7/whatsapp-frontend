import { useState } from "react"
import { ClipLoader } from "react-spinners"
import VideoThumbnail from "react-video-thumbnail"
import { useDispatch, useSelector } from "react-redux"

import { Add } from "./Add"
import { CloseIcon, SendIcon } from "../../../../svg"
import { uploadFiles } from "../../../../utils/upload"
import { removeFileFromFiles, send_message } from "../../../../features/chatSlice"
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

  const handleRemoveFile = (idx) => {
    dispatch(removeFileFromFiles(idx))
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
                w-14 h-14 border mt-2 dark:border-white rounded-md overflow-hidden cursor-pointer relative fileThumbnail
                ${activeIndex === idx ? 'border-[3px] !border-green_1' : ''}
              `} 
              onClick={() => setActiveIndex(idx)}
            >
              {
                file.type === 'IMAGE' ? (
                  <img src={file.fileData} alt="" className="w-full h-full object-cover" />
                ) : file.type === 'VIDEO' ? (
                  <VideoThumbnail 
                    videoUrl={file.fileData}
                  />
                ) : (
                  <img src={`../../../../images/file/${file.type}.png`} alt="" className="w-8 h-10 mt-1.5 ml-2.5" />
                )
              }
              <div 
                className="removeFileIcon hidden"
                onClick={() => handleRemoveFile(idx)}
              >
                <CloseIcon className='dark:fill-white absolute right-0 top-0 w-4 h-4' />
              </div>
            </div>
          ))
        }
        
        <Add setActiveIndex={setActiveIndex} /> 
      </div>
      
      <div 
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={(evt) => sendMessageHandler(evt)}
      >
        {
          loading ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <SendIcon className="fill-white" />
          )
        }
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
