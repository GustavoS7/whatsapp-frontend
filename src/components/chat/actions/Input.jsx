export function Input ({ message, setMessage, textRef }) {
  
  const onChangeHanlder = (evt) => {
    setMessage(evt.target.value)
  }

  return (
    <div className="w-full">
      <input 
        type="text" 
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4" 
        placeholder="Type a message"
        value={message}
        onChange={onChangeHanlder}
        ref={textRef}
      />
    </div>
  )
}