const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mx-auto" />
      <h2 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
      <p className="text-sm">#{pokemon.id}</p>
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {pokemon.types.map(type => (
          <span key={type} className="px-2 py-1 text-xs bg-gray-200 rounded capitalize">
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard
