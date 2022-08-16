import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import '../styles/Board.css';

function Board() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [initAnimals] = useState({
    giraffe: { image: "🦒", clicked: false },
    zebra: { image: "🦓", clicked: false },
    deer: { image: "🦌", clicked: false },
    kangaroo: { image: "🦘", clicked: false },
    raccoon: { image: "🦝", clicked: false },
    turtle: { image: "🐢", clicked: false },
    snake: { image: "🐍", clicked: false },
    tiger: { image: "🐅", clicked: false },
    elephant: { image: "🐘", clicked: false },
  });
  const [animals, setAnimals] = useState(initAnimals);

  useEffect(() => {
    Object.entries(animals).map((animal) => console.log(animal));
  }, [animals]);

  useEffect(() => {
    if (currScore > bestScore) {
      setBestScore(currScore);
    }
  }, [currScore]);

  function handleAnimalClick(animal) {
    if (animal[1].clicked) {
      setCurrScore(0);
      setAnimals(initAnimals);
    } else {
      setAnimals({
        ...animals,
        [animal[0]]: { image: animal[1].image, clicked: true },
      });
      setCurrScore(currScore + 1);
    }
  }

  return (
    <div className="Board">
      <div className="Scores">
        <div>Best Score: {bestScore}</div>
        <div className="Score">Score: {currScore}</div>
      </div>

      <Container>
        {Object.entries(shuffleObject(animals)).map((animal) => (
          <div
            key={Math.floor(Math.random() * 100000)}
            onClick={() => {
              handleAnimalClick(animal);
            }}
          >
            {animal[1].image}
          </div>
        ))}
      </Container>
    </div>
  );
}

function shuffleObject(obj) {
  let newObj = {};
  var keys = Object.keys(obj);
  keys.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  keys.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return newObj;
}

export default Board;
