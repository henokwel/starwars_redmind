import { useState, useEffect } from 'react';
 import ClipLoader from "react-spinners/ScaleLoader";
import Card from './Components/Card';
import './styles/App.css';
import IArrow from './Assets/arrowIconWhite.svg'
import ISearch from './Assets/SearchIconWhite.svg'
import IArrowback from './Assets/arrowIconBlack.svg'




function App() {
  //  toggle states
  const [inputFoucs, setInputFoucs] = useState(false)
  const [backFromSearch, setBackFromSearch] = useState(false)
  const [loading, setLoading] = useState(true);

  // Search Input state
  const [character, setCharacter] = useState(null)

  // 
  const [starWarsData, setStarWarsData] = useState(null)
  const [page, setPage] = useState({ prev: false, next: true })




  // Initial Fetch
  useEffect(() => {
    (async () => {
      const req = await fetch("https://swapi.dev/api/people")
      const res = await req.json()
      setPage({ prev: res.previous, next: res.next })
      setStarWarsData(res.results)
      setLoading(false)
    })()
  }, [])

  

  const handleSearch = async () => {
    if (!character) return

    const req = await fetch(`https://swapi.dev/api/people/?search=${character.trim()}`)
    const res = await req.json()

    // setCharacter(null)
    setBackFromSearch(true)
    setStarWarsData(res.results)
  }

  const handleBackFromSearch = async () => {
    const { prev } = page

    // fetch previous page
    if (prev !== null) {
      const prevPage = prev.charAt(page.prev.length - 1)
      const req = await fetch(`https://swapi.dev/api/people/?page=${+prevPage + 1}`)
      const res = await req.json()

      setStarWarsData(res.results)
      setBackFromSearch(false)
      setCharacter(null)

    } else {

      const req = await fetch("https://swapi.dev/api/people")
      const res = await req.json()

      setPage({ prev: res.previous, next: res.next })
      setStarWarsData(res.results)
      setBackFromSearch(false)
      setCharacter(null)  
    }
  }


  const handlePagination = async (type, { prev, next }) => {
    if (type === "next") {
      const req = await fetch(next)
      const res = await req.json()

      setPage({ prev: res.previous, next: res.next })
      setStarWarsData(res.results)
      return

    } else {
      if (!prev) return
      const req = await fetch(prev)
      const res = await req.json()

      setPage({ prev: res.previous, next: res.next })
      setStarWarsData(res.results)
      return
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Star Wars RedMind</h1>
      </header>

      <main className="main">
        {/* Search Box Container */}

        <div className="search_box_container">

          {/* Go back from Search */}
          <div className="finish_search_container">
            <button
              aria-label="Return to home page"
              className={`back-arrow-${backFromSearch ? "open" : "close"}`}
              onClick={() => handleBackFromSearch()}
            >
              {/* Icon , Only show when Search has return value */}
              <img
                className="arrow-open"
                src={IArrowback}
                alt="Previous results"
              />
            </button>
          </div>

          <div className="search_box">

            <lable htmlFor="characterSearch">
              <input
                type="text"
                aria-label="Search for character"
                name="characterSearch"
                id="characterSearch"
                value={character !== null ? character : "" }
                onChange={(e) => { setCharacter(e.target.value) }}
                onFocus={(e) => { setInputFoucs(true) }}
              // onBlur={(e) => { setInputFoucs(false) }}
              />
            </lable>

            <button
              aria-label="Search"
              onClick={() => handleSearch()}
            >
              {/* OnFocus Disable Search Icon and repace with Enter */}

              {
                !inputFoucs ?
                  <img
                    src={ISearch}
                    alt="Search Button Icon"
                  />
                  :
                  <div className="search_enter">
                    <p>Enter</p>
                  </div>
              }

            </button>
          </div>

        </div>

        {/* Card List */}
        <div className="card_list_container">

          {/* Map Cards Here */}

          {
            starWarsData === null ?
              <div className="card_list_loading">
                <ClipLoader color="#ffffff" loading={loading} size={100} />
              </div>
              :

              starWarsData.map((item, index) => <Card key={index} item={item} index={index} />)
          }


          {/* IF Search Result return noting */}
          {
            starWarsData !== null && starWarsData.length === 0 ?
              <div className="card_list_error">
                <h1 tabIndex="0">The Force has abandoned you.</h1>
                <h1 tabIndex="0">Try again</h1>
              </div>
              :
              ""
          }

        </div>


        {

          // Hide Navigation when fetching data
          starWarsData === null ?
            ""
            :
            // Hide Navigation After Search
            backFromSearch ? "" :


              // {/* Pagination here */}
              <div className="pagination_container">
                <button className="pagination-btn-left"
                  aria-label="back to previous page"
                  onClick={() => handlePagination("prev", page)}
                  style={{ display: page.prev === null ? "none" : "inline-block" }}
                >
                  {/* Icon */}
                  <img
                    src={IArrow}
                    alt="Previous page Icon"
                  />
                </button>

                <button className="pagination-btn"
                  aria-label="Next page"
                  onClick={() => handlePagination("next", page)}
                  style={{ display: page.next === null ? "none" : "inline-block" }}
                >
                  {/* Icon */}
                  <img
                    src={IArrow}
                    alt="Next page Icon"
                  />
                </button>
              </div>
        }


      </main>

    </div>
  );
}

export default App;
