import { useState } from "react"
import { SidebarHeader } from "./header"
import { Notifications } from "./notifications"
import { Conversations } from "./conversations"
import { Search, SearchResults } from "./search"

export function Sidebar () {
  const [searchResults, setSearchResults] = useState([])
  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />

      <Notifications />

      <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />      

      {
        searchResults.length > 0 ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <Conversations />
        )
      }
    </div>
  )
}