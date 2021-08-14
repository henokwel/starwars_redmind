import React, { useState } from 'react'
 import arrow from '../Assets/downIconWhite.svg'
import '../styles/Card.css'

export default function Card({ item, index }) {


    const { name, birth_year, gender } = item
    const [isOpen, setIsOpen] = useState(false);





    return (
        <div
            className="card_item" >
            <button className="card_title_container"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`sec${+index + 1}`}
                id={`card${+index + 1}p`}
                data-allow-toggle
            >

                <div className="card_title">
                    <p>{name}</p>
                </div>

                <div className="card_title_icon">
                    <img
                        className={`arrow-${isOpen ? "open" : "close"}`}
                        src={arrow}
                        alt={`Card ${isOpen ? "open" : "close"}`}
                    />
                </div>
            </button>

            {isOpen && <div className="card_content"
                id={`sec${+index + 1}`}
                aria-labelledby={`card${+index + 1}p`}
                role="region">

                <p tabIndex="0" >Name: {name}</p>
                <p tabIndex="0">Year born : {birth_year}</p>
                <p tabIndex="0" >Gender: {gender === "n/a" ? "Unknown" : gender}</p>

            </div>}
        </div>



    );
}
