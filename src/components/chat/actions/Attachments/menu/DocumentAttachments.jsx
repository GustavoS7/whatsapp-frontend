import { useRef } from "react"
import { useDispatch } from "react-redux"

import { DocumentIcon } from "../../../../../svg"
import { getFileType } from "../../../../../utils/file"
import { addFiles } from "../../../../../features/chatSlice"

export function DocumentAttachment() {

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const documentHandler = (evt) => {
    let files = Array.from(evt.target.files)
    files.forEach((file) => {
      if (
        file.type !== 'application/pdf' &&
        file.type !== 'text/plain' &&
        file.type !== 'application/msword' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        file.type !== 'application/vnd.ms-powerpoint' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
        file.type !== 'application/vnd.ms-excel' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.rar' &&
        file.type !== 'application/zip' &&
        file.type !== 'audio/mp3' &&
        file.type !== 'audio/wav'
      ) {
        files = files.filter((item) => item.name !== file.name)
        return
      } else if (file.size > 1024 * 1024 * 5) {
        files = files.filter((item) => item.name !== file.name)
        return
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          dispatch(
            addFiles({ 
              file: file, 
              type: getFileType(file.type)
            })
          )
        }
      }
    })
  }

  return (
    <li>
      <button 
        type="button" 
        className="bg-[#5f66cd]" 
        onClick={() => inputRef.current.click()}
      >
        <DocumentIcon />
      </button>
      <input 
        type="text" 
        hidden
        multiple
        ref={inputRef}
        accept="
          application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
          application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,
          application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.rar,application/zip,audio/mp3,audio/wav
        "
        onChange={documentHandler}
      />
    </li>
  )
}
