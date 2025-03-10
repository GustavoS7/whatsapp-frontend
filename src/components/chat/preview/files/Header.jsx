import { useDispatch, useSelector } from "react-redux"

import { CloseIcon } from "../../../../svg"
import { clearFiles } from "../../../../features/chatSlice"

export function Header ({ activeIndex }) {

  const dispatch = useDispatch()

  const { files } = useSelector((state) => state.chat)

  const clearFilesHandler = () => {
    dispatch(clearFiles())
  }

  return (
    <div className="w-full">
      <div className="full flex items-center justify-between">
        <div className="cursor-pointer translate-x-4" onClick={clearFilesHandler}>
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>

        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.file?.name}
        </h1>
        <span></span>
      </div>
    </div>
  )
}
