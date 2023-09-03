import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/assets/images/dofus-1.png", matched: false },
  { src: "/assets/images/dofus-2.png", matched: false },
  { src: "/assets/images/dofus-3.png", matched: false },
  { src: "/assets/images/dofus-4.png", matched: false },
  { src: "/assets/images/dofus-5.png", matched: false },
  { src: "/assets/images/dofus-6.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className='App'>
      <h1><img src="./assets/images/Dofus_Logo.png" alt="logo dofus match" /></h1>
      <div className='div-h1'></div>
      <div className='div-display'>
        <div className='btn-new' onClick={shuffleCards}>
          <span>Nouvelle Partie</span>
        </div>
        <div className='score'>
          Nombre d'essai : <span className='span-score'>{turns}</span>
        </div>
      </div>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className='copyright-div'>
        <p className='copyright-p'>
          Dofus est un MMORPG édité par{" "}
          <a rel='noreferrer' target='_blank' href='https://www.ankama.com/fr'>
            Ankama.
          </a>{" "}
          " Dofus Match " est un site non-officiel sans aucun lien avec Ankama.
          Toutes les illustrations sont la propriété d'Ankama Studio et de
          Dofus.
        </p>
        <a
          className='a-github'
          rel='noreferrer'
          target='_blank'
          href='https://github.com/BruandT'
        >
          Ymokay
        </a>
      </div>
    </div>
  );
}

export default App;
