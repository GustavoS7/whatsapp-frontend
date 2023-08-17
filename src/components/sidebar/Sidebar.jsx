import { useState } from "react"

import { SidebarHeader } from "./header"
import { Notifications } from "./notifications"
import { Conversations } from "./conversations"
import { Search, SearchResults } from "./search"

export function Sidebar ({ onlineUsers, typing }) {
  const [searchResults, setSearchResults] = useState([])
  return (
    <div className="flex0030 w-[40%] h-full select-none">
      <SidebarHeader />

      <Notifications />

      <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />      

      {
        searchResults.length > 0 ? (
          <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} />
        ) : (
          <Conversations onlineUsers={onlineUsers} typing={typing} />
        )
      }
    </div>
  )
}