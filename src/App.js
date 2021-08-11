import { useState, useRef, useEffect } from 'react';
import Card from './Components/Card';
import './styles/App.css';
import IArrow from './Assets/arrowIconWhite.svg'
import ISearch from './Assets/SearchIconWhite.svg'
import IArrowback from './Assets/arrowIconBlack.svg'

const fakeData = [
  {
    id: 1,
    name: "Henok",
    content: "Hksdfjdhf"
  },
  {
    id: 2,
    name: "Luffy",
    content: "Hksdfjdhf"
  },
  {
    id: 3,
    name: "zoro",
    content: "Hksdfjdhf"
  },
  // {
  //   id: 1,
  //   name: "Henok",
  //   content: "Hksdfjdhf"
  // },
  // {
  //   id: 2,
  //   name: "Luffy",
  //   content: "Hksdfjdhf"
  // },
  // {
  //   id: 3,
  //   name: "zoro",
  //   content: "Hksdfjdhf"
  // },
  // {
  //   id: 1,
  //   name: "Henok",
  //   content: "Hksdfjdhf"
  // },
  // {
  //   id: 2,
  //   name: "Luffy",
  //   content: "Hksdfjdhf"
  // },
  // {
  //   id: 3,
  //   name: "zoro",
  //   content: "Hksdfjdhf"
  // }

]


function App() {
  const [inputFoucs, setInputFoucs] = useState(false)
  const [backFromSearch, setBackFromSearch] = useState(false)

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
          <button className={`back-arrow-${backFromSearch ? "open" : "close"}`}>
              {/* Icon , Only show when Search has return value */}
              <img
                className="arrow-open"
                src={IArrowback}
                alt="Previous results"
              />
            </button>
          </div>

          <div className="search_box">
            <input
              onFocus={(e) => { setInputFoucs(!inputFoucs) }}
            />
            <button>
              {/* OnFocus Disable Search Icon and repace with Enter */}

              {
                inputFoucs ?
                  <img
                    // className={`arrow ${isOpen ? "open" : "close"}`}
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
            fakeData.map((item, index) => <Card key={index} title={item.name} content={item.content} />)
          }

        </div>


        {/* Pagination here */}
        <div className="pagination_container">
          <button className="pagination-btn-left">
            {/* Icon */}
            <img
              // className={`arrow ${isOpen ? "open" : "close"}`}
              src={IArrow}
              alt="Previous results"
            />
          </button>

          <button className="pagination-btn">
            {/* Icon */}
            <img
              // className={`arrow ${isOpen ? "open" : "close"}`}
              src={IArrow}
              alt="Previous results"
            />
          </button>

        </div>

      </main>

    </div>
  );
}

export default App;
