import { useRef, useState } from "react"

export function Picture ({ readablePicture, setReadablePicture, setPicture }) {

  const [error, setError] = useState()
  
  const inputRef = useRef()

  const handlePicture = (evt) => {
    const pic = evt.target.files[0]
    
    if(
      pic.type !== 'image/jpeg' &&
      pic.type !== 'image/png' &&
      pic.type !== 'image/webp'
    ) {
      setError(`${pic.name} format is not supported`)
      return
    } else if (pic.size > 1024*1024*5) {
      setError(`${pic.name} is too large, maximum 5mb allowed`)
      return
    } else {
      setError("")
      setPicture(pic)

      const reader = new FileReader()
      reader.readAsDataURL(pic)
      reader.onload = (evt) => {
        setReadablePicture(evt.target.result)
      }
    }
  }

  const handleRemovePic = () => {
    setPicture("")
    setReadablePicture("")
  }

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picute" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {
        readablePicture ? (
          <div>
            <img 
              src={readablePicture} 
              alt=""
              className="w-20 h-20 object-cover rounded-full"
            />
            <div 
              className="mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xs flex items-center justify-center cursor-pointer"
              onClick={() => handleRemovePic()}
            >
              Remove
            </div>
          </div>
        ) : (
          <div 
            className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
            onClick={() => inputRef.current.click()}
          >
            Upload Picture
          </div>
        )
      }
      <input 
        type="file" 
        name="picture" 
        id="picture" 
        hidden 
        ref={inputRef} 
        accept="image/png,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  )
}