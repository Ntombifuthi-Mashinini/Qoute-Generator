import { useEffect, useMemo, useState } from 'react'
import quotesData from './quotes.json'

function getRandomIndex(max) {
  return Math.floor(Math.random() * max)
}

export default function App() {
  const quotes = useMemo(() => quotesData, [])
  const [index, setIndex] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lastQuoteIndex')
    if (saved !== null) {
      const parsed = Number(saved)
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed < quotes.length) {
        setIndex(parsed)
      }
    } else {
      setIndex(getRandomIndex(quotes.length))
    }
  }, [quotes.length])

  useEffect(() => {
    localStorage.setItem('lastQuoteIndex', String(index))
  }, [index])

  useEffect(() => {
    setShow(false)
    const t = setTimeout(() => setShow(true), 10)
    return () => clearTimeout(t)
  }, [index])

  const current = quotes[index] || { text: '', author: '' }

  function nextQuote() {
    let next = getRandomIndex(quotes.length)
    if (quotes.length > 1 && next === index) {
      next = (index + 1) % quotes.length
    }
    setIndex(next)
  }

  function copyQuote() {
    const full = `"${current.text}" — ${current.author}`
    navigator.clipboard.writeText(full).catch(() => {})
  }

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Simple Quote Generator</h1>

        <div className="quoteBox">
          <p className={`quote ${show ? 'show' : ''}`}>“{current.text}”</p>
          <div className="author">— {current.author}</div>
        </div>

        <footer className="footer">
          Built with ❤️ by Ntombifuthi
        </footer>

        <div className="controls">
          <button className="btn primary" onClick={nextQuote}>
            New Quote
          </button>
          <button className="btn" onClick={copyQuote}>
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}



