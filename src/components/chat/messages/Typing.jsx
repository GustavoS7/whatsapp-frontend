import { BeatLoader } from "react-spinners";

export function Typing () {
  return (
    <div className="w-full flex mt-2 space-x-3 max-w-xs">
      <div>
        <div className="relative h-full dark:text-dark_text_1 p-2 rounded-lg dark:bg-dark_bg_2">
          <BeatLoader color="#fff" size={10} />
        </div>
      </div>
    </div>
  )
}