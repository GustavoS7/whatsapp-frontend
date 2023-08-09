import { Contact } from "./"

export function SearchResults ({ searchResults }) {
  return (
    <div className="w-full conversations scrollbar">
      <div>
        <div className="flex flexcol px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contaxts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>
        <ul>
          {
            searchResults && searchResults.map((user) => (
              <Contact contact={user} key={user._id} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}
