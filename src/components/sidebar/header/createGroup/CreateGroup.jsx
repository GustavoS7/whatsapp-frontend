import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";

import UnderlineInput from "./UnderlineInput";
import MultipleSelect from "./MultipleSelect";

import { create_group_conversation } from "../../../../features/chatSlice";

import { ReturnIcon } from "../../../../svg";

export function CreateGroup ({ setShowCreateGroup }) {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { status } = useSelector((state) => state.chat)

  const { token } = user
  
  const [name, setName] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])

  const createGroupHandler = async () => {
    if (status !== 'loading') {
      const users = []
      selectedUsers.forEach(user => {
        users.push(user.value)
      })
      const values = {
        name,
        users,
        token
      }
      const newConversation = await dispatch(create_group_conversation(values))

      setShowCreateGroup(false)
    }
  }

  const handleSearch = async (evt) => {
    if (evt.targert.value && evt.key === 'Enter') {
      setSearchResults([])
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${evt.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (data.length > 0) {
          const tempArray = []
          data.forEach(user => {
            const temp = {
              value: user._id,
              label: user.name,
              picture: user.picture
            }
            tempArray.push(temp)
          })
          setSearchResults(tempArray)
        } else {
          setSearchResults([])
        }
        setSearchResults(data)
      } catch (error) {
        console.log(error.response.data.error.message)
      }
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      <div className="mt-5">
        <button 
          className="btn w-6 h-6 border"
          onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className="fill-white" />
        </button>
        <UnderlineInput name={name} setName={setName} />

        <MultipleSelect
          selectedUsers={selectedUsers}
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />

        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          <button
            className="btn bg-green_1 scale-150 hover:bg-green_500"
            onClick={() => createGroupHandler}
          >
            {
              status === 'loading' ? <ClipLoader color="#e9edef" size={25} /> : 'ValidIcon'
              // <ValidIcon className="fill-white mt-2 h-full" />
            }
          </button>
        </div>
      </div>
    </div>
  )
}
