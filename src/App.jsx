import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonCard from './components/PokemonCard'

function App() {
  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        const pokemonDetails = await Promise.all(
          res.data.results.map(pokemon => axios.get(pokemon.url))
        )
        const data = pokemonDetails.map(res => ({
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.front_default,
          types: res.data.types.map(t => t.type.name),
        }))
        setAllPokemon(data)
        setFilteredPokemon(data)
        const allTypes = [...new Set(data.flatMap(p => p.types))]
        setTypes(allTypes.sort())
      } catch (error) {
        setError('Failed to fetch Pokémon')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = allPokemon
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(selectedType)
      )
    }
    setFilteredPokemon(filtered)
  }, [searchTerm, selectedType, allPokemon])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <TypeFilter types={types} value={selectedType} onChange={setSelectedType} />
        </div>

        {loading && <p>Loading Pokémon...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && filteredPokemon.length === 0 && (
          <p>No Pokémon found.</p>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
