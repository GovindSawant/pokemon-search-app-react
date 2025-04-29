const TypeFilter = ({ types, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 rounded border"
    >
      <option value="">All Types</option>
      {types.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}

export default TypeFilter
