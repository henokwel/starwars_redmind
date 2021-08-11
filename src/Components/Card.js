import React, { useState } from 'react'
import arrow from '../Assets/downIconWhite.svg'
import '../styles/Card.css'

export default function Card({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card_item" >
            <button className="card_title_container"
                onClick={() => setIsOpen(!isOpen)}>


                <div className="card_title">
                    <p>{title}</p>
                </div>

                <div className="card_title_icon">
                    <img
                        className={`arrow-${isOpen ?"open" :"close"}`}
                        src={arrow}
                        alt={`Card ${isOpen ? "open" : "close"}`}
                    />
                </div>
            </button>

            {isOpen && <div className="card_content">
                <p>First name: {content}</p>
                <p>First name: {content}</p>
                <p>First name: {content}</p>
            </div>}
        </div>
    );
}
