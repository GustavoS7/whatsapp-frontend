import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { PulseLoader } from "react-spinners"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from "react-redux"

import { AuthInput } from "./AuthInput"
import { signUpSchema } from "../../utils/validation"
import { Picture } from "../../components/auth/Picture"
import { registerUser, changeStatus } from "../../features/userSlice"

const { REACT_APP_CLOUD_SECRET, REACT_APP_CLOUD_NAME } = process.env

export function RegisterForm () {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.user)
  const [picture, setPicture] = useState()
  const [readablePicture, setReadablePicture] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  })

  const onSubmit = async (data) => {
    let response

    dispatch(changeStatus('loading'))

    if(picture) {
      await uploadImage().then(async (res) => {
        response = await dispatch(registerUser({
          ...data,
          picture: res.secure_url
        }))
      })
      if (response?.payload?.user) {
        navigate('/')
      }
    } else {
      response = await dispatch(registerUser({
        ...data,
        picture: ''
      }))
      if (response?.payload?.user) {
        navigate('/')
      }
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()

    formData.append('upload_preset', REACT_APP_CLOUD_SECRET)
    formData.append('file', picture)

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    )

    return data
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
        >
          <AuthInput 
            name='name'
            type='text'
            placeholder='Full Name'
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput 
            name='email'
            type='text'
            placeholder='Email address'
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput 
            name='status'
            type='text'
            placeholder='Status (Optional)'
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput 
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            error={errors?.password?.message}
          />
          <Picture 
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
          />
          {
            error ? (
              <div>
                <p className="text-red-400">
                  {error}
                </p>
              </div>
            ) : (
              null
            )
          }
          <button 
            className="
              w-full flex justify-center bg-green_1 text-gray-100 
              p-4 rounded-full tracking-wide font-semibold focus:outline-none 
              hover:bg-green_2 shadow-lg cursor-pointer transition ease-in 
              duration-300"
            type="submit"
          >
            {status === 'loading' ? (
              <PulseLoader color="#fff" size={16} /> 
            ) : ( 
              'Sign up'
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account?</span>
            <Link 
              href='/login'
              className='hover:underline cursor-pointer transition ease-in duration-300'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}