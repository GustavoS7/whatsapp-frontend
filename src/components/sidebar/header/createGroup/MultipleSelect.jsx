import Select from 'react-select'

export default function MultipleSelect({ selectedUsers, searchResults, setSelectedUsers, handleSearch }) {
  return (
    <div className='mt-4'>
      <Select
        options={searchResults}
        onChange={setSelectedUsers}
        onKeyDown={(e) => handleSearch(e)}
        placeholder="Search, select users"
        isMulti
        formatOptionLabel={(user) => (
          <div className='flex items-center gap-1'>
            <img src={user.picture} alt="" className='w-8 h-8 object-cover rounded-full' />
            <span classname="text-[#222]">{user.label}</span>
          </div>
        )}
        styles={{
          control: (base, state) => ({
            ...base,
            border: 'none',
            borderColor: 'transparent',
            background: 'transparent'
          })
        }}
      />
    </div>
  )
}
