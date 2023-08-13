import { useState } from "react";
import { CameraIcon, ContactIcon, DocumentIcon, PollIcon, StickerIcon } from "../../../../../svg";
import { PhotoAttachment } from "./PhotoAttachments";

export function Menu () {

  const [show, setShow] = useState(false)
  
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
      <li>
        <button type="button" className="bg-[#5f66cd] rounded-full">
          <DocumentIcon />
        </button>
      </li>
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
      <PhotoAttachment/>
    </ul>
  )
}