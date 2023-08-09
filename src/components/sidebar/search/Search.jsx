import { useState } from "react"
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

export function Search ({ searchLength, setSearchResults }) {
  
  const { user } = useSearchParams((state) => state.user)
  const [show, setShow] = useState()

  const handleSearch = async (evt) => {
    if (evt.target.value && evt.key === 'Enter') {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${evt.target.value}`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )

        setSearchResults(data)
      } catch (error) {
        console.log(error.response.data.error.message)
      }
    } else {
      setSearchResults([])
    }
  }
  
  return (
    <div className="h-[49px] py-1.5">
      <div className="px-10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span 
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text" 
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(evt) => handleSearch(evt)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  )
}