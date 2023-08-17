import { useState } from "react"

import { Input } from "./Input"
import { Header } from "./Header"
import { FileViewer } from "./FileViewer"
import HandleAndSend from "./HandleAndSend"

export function FilesPreview () {

  const [message, setMessage] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative py-2 w-ful items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <Header activeIndex={activeIndex} />

        <FileViewer activeIndex={activeIndex} />

        <div className="w-full flex flex-col items-center">
          <Input 
            message={message}
            setMessage={setMessage}
          />

          <HandleAndSend 
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  )
}
