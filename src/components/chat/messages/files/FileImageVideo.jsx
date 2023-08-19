export function FileImageVideo ({ url, type }) {
  return (
    <>
      {
        type === 'IMAGE' ? (
          <img src={url} alt="" />
        ) : (
          <video src={url} ></video>
        )
      }
    </>
  )
}
