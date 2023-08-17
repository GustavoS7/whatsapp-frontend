import axios from "axios"

const cloud_name = process.env.REACT_APP_CLOUD_NAME
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET

export const uploadFiles = async (files) => {
  const formData = new FormData()
  formData.append('upload', cloud_secret)
  const uploaded = []
  for (const f of files) {
    const { file, type } = f
    formData.append("file", file)
    const res = await uploadToCloudinary(formData)
    uploaded.push({
      file: res,
      type
    })
  }
  return uploaded
}

const uploadToCloudinary = async (formData) => {
  return new Promise(async (resolve) => {
    return await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData
    )
    .then(({ data }) => {
      resolve(data)
    })
    .catch((err) => {
      console.log(err)
    })
  })
}