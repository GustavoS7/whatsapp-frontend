import { useEffect, useState } from "react"

// import { CloseIcon, ValidIcon } from "../../../svg"

export function Ringing({ call, setCall, answerCall, endCall }) {

  const { name, picture } = call

  const [timer, setTimer] = useState(0)

  let interval

  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
  }

  useEffect(() => {
    if (timer <= 5) {
      handleTimer()
    } else {
      setCall((call) => ({ ...call, receivingCall: false }))
    }
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      <div className="p-4 flex align-center justify-between gap-x-8">
        <div className="flex items-center gap-x-2">
          <img 
            src={picture}
            alt={`caller profile`} 
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp Video...</span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              Close
              {/* <CloseIcon className="fill-white w-5" /> */}
            </button>
          </li>
          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              valid
              {/* <ValidIcon className="fill-white w-6 mt-2" /> */}
            </button>
          </li>
        </ul>
      </div>
      <audio src="../../../../ringtone.mp3" autoPlay loop></audio>
    </div>
  )
}
