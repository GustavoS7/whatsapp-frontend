import { useRef } from "react"
import { PhotoIcon } from "../../../../../svg"
import { useDispatch, useSelector } from "react-redux"
import { addFiles } from "../../../../../features/chatSlice"

export function PhotoAttachment () {

  const dispatch = useDispatch()

  const inputRef = useRef()

  const imageHandler = (evt) => {
    let files = Array.from(evt.target.files)
    files.forEach((img) => {
      if (
        img.type !== 'image/png' &&
        img.type !== 'image/jpeg' &&
        img.type !== 'image/gif' &&
        img.type !== 'image/wepb'
      ) {
        files = files.filter((item) => item.name !== img.name)
        return
      } else if (img.size > 1024 * 1024 * 5) {
        files = files.filter((item) => item.name !== img.name)
        return
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = (e) => {
          dispatch(addFiles({ file: img, imgData: e.target.result, type: 'image' }))
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
        ref={useRef} 
        image="image/png,image/jpeg,image/gif,image/webp" 
        onChange={imageHandler}
      />
    </li>
  )
}
