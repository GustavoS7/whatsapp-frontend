import { useRef } from "react"
import { useDispatch } from "react-redux"

import { CloseIcon } from "../../../../svg"
import { getFileType } from "../../../../utils/file"
import { addFiles } from "../../../../features/chatSlice"

export function Add () {

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const filesHandler = (evt) => {
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
        file.type !== 'audio/wav' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/wepb' &&
        file.type !== 'video/mp4' &&
        file.type !== 'video/mpeg' &&
        file.type !== 'video/webm'
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
              fileData: getFileType(file.type) === 'IMAGE' ? e.target.result : '',
              type: getFileType(file.type)
            })
          )
        }
      }
    })
  }

  return (
    <div
      className="w-14 h-14 border dark:border-white rounded-md flex items-center mt-2 justify-center cursor-pointer"
      onClick={() => inputRef.current.click()}
    >
      <span className="rotate-45">
        <CloseIcon className="dark:fill-dark_svg_1" />
      </span>

      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,video/webm"
        onChange={filesHandler}
      />
    </div>
  )
}
