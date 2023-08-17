import { Menu } from "./menu/Menu"
import { AttachmentIcon } from "../../../../svg"

export function Attachments ({ showAttachments, setShowAttachments, setShowEmoji }) {

  return (
    <li className="relative">
      <button 
        className="btn" 
        type="button"
        onClick={() => {
          setShowEmoji(false)
          setShowAttachments((prev) => !prev)
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {
        showAttachments
        ? <Menu />
        : null
      }
    </li>
  )
}
