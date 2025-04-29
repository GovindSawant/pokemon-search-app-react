const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 rounded border"
    />
  )
}

export default SearchBar
