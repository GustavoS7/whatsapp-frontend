import { PhotoAttachment } from "./PhotoAttachments"
import { DocumentAttachment } from "./DocumentAttachments"
import { CameraIcon, ContactIcon, PollIcon, StickerIcon } from "../../../../../svg"

export function Menu () {

  return (
    <ul className="absolute bottom-12 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0eaef4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachment />
      <li>
        <button type="button" className="bg-[#d3396d] rounded-full">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachment />
    </ul>
  )
}
