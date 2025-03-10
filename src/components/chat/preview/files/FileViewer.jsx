import { useSelector } from "react-redux"

export function FileViewer ({ activeIndex }) {

  const { files } = useSelector((state) => state.chat)

  return (
    <div className="w-ful max-w-[60%]">
      <div className="flex justify-center items-center">
        {
          files[activeIndex].type === "IMAGE" ? (
            <img
              src={files[activeIndex].fileData}
              alt=""
              className="max-w-[80%] object-contain hview"
            />
          ) : files[activeIndex].type === 'VIDEO' ? (
            <video
              src={files[activeIndex].fileData}
              controls
              className="max-w-[80%] object-contain hview"
            ></video>
          ) : (
            <div className="min-w-full hview flex flex-col items-center justify-center">
              <img
                src={`../../../../images/file/${files[activeIndex].type}.png`}
                alt={files[activeIndex].type}
              />
              <h1 className="dark:text-dark_text_2 text-2xl">
                No preview available
              </h1>
              <span className="dark:text-dark_text_2">
                {files[activeIndex]?.file?.size } kB - { files[activeIndex]?.type}
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}
