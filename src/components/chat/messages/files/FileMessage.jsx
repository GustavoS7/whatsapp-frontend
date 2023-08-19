import moment from "moment"

import { FileImageVideo } from "./FileImageVideo"
import TraingleIcon from '../../../../svg/Triangle'

export function FileMessage({ FileMessage, message, me }) {
  
  const { type, file } = FileMessage

  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${ me ? 'ml-auto justify-end' : '' }`}>
      <div>
        <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${ me ? 'bg-green_3' : 'dark:bg-dark_bg_2' }`}>
          <p className="h-full text-sm">
            {
              type === 'IMAGE' || type === 'VIDEO' ? (
                <FileImageVideo url={file.secure_url} type={type} />
              ) : (
                null
              )
            }
          </p>
          <span
            className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none"
          >
            { moment(message.createdAt).format('HH:mm') }
          </span>
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
