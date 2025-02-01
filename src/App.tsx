import { useState, useEffect } from 'react'
import './App.css'

interface Pokemon {
  id: number
  name: string
  image: string
  uniqueId: number
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [cards, setCards] = useState<Pokemon[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [score, setScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [canClick, setCanClick] = useState(true)

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6')
      const data = await response.json()
      const pokemonData = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const res = await fetch(p.url)
          const details = await res.json()
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default,
          } as Pokemon
        })
      )
      setPokemon(pokemonData)
    }
    fetchPokemon()
  }, [])

  // Initialize game cards
  useEffect(() => {
    if (pokemon.length > 0) {
      const duplicated = [...pokemon, ...pokemon]
        .sort(() => Math.random() - 0.5)
        .map((p, index) => ({ ...p, uniqueId: index }))
      setCards(duplicated)
    }
  }, [pokemon])

  // Handle card click
  const handleClick = (uniqueId: number) => {
    if (!canClick || flipped.includes(uniqueId) || matched.has(uniqueId)) return
    
    const newFlipped = [...flipped, uniqueId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setCanClick(false)
      const [firstId, secondId] = newFlipped
      const firstCard = cards.find(c => c.uniqueId === firstId)
      const secondCard = cards.find(c => c.uniqueId === secondId)

      if (firstCard?.id === secondCard?.id) {
        setMatched(prev => new Set([...prev, firstId, secondId]))
        setScore(prev => prev + 1)
        setFlipped([])
        setCanClick(true)
      } else {
        setTimeout(() => {
          setFlipped([])
          setCanClick(true)
        }, 1000)
      }
    }
  }

  // Check win condition
  useEffect(() => {
    if (matched.size === cards.length && cards.length > 0) {
      setGameWon(true)
    }
  }, [matched, cards.length])

  // Reset game
  const resetGame = () => {
    const duplicated = [...pokemon, ...pokemon]
      .sort(() => Math.random() - 0.5)
      .map((p, index) => ({ ...p, uniqueId: index }))
    setCards(duplicated)
    setFlipped([])
    setMatched(new Set())
    setScore(0)
    setGameWon(false)
    setCanClick(true)
  }

  return (
    <div className="App">
      <h1>Pokemon Memory Game</h1>
      <div className="score">Score: {score}</div>
      
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`card ${flipped.includes(card.uniqueId) || matched.has(card.uniqueId) ? 'flipped' : ''}`}
            onClick={() => handleClick(card.uniqueId)}
          >
            <div className="front"></div>
            <div className="back">
              <img src={card.image} alt={card.name} />
              <div className="pokemon-name">{card.name}</div>
            </div>
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="game-won">
          <h2>Congratulations! You won!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  )
}

export default App