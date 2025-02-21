import { useRef } from "react"
import { useDispatch } from "react-redux"

import { PhotoIcon } from "../../../../../svg"
import { getFileType } from "../../../../../utils/file"
import { addFiles } from "../../../../../features/chatSlice"

export function PhotoAttachment () {

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const imageHandler = (evt) => {
    let files = Array.from(evt.target.files)
    files.forEach((file) => {
      if (
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
          dispatch(addFiles({
            file: file,
            fileData: e.target.result,
            type: getFileType(file.type)
          }))
        }
      }
    })
  }

  return (
    <li>
      <button
        type="button"
        className="bg-[#bf59cf] rounded-full"
        onClick={() => inputRef.current.click()}
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,video/webm"
        onChange={imageHandler}
      />
    </li>
  )
}
