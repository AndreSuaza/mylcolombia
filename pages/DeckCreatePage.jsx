import { CreateDeck } from "../components/CreateDeck";
import { CardFinder } from "../components/CardFinder";
import { useState } from "react";

export const DeckCreatePage = () => {

  const [deck, setDeck] = useState([]);

  const modifyNumberCards = (dataCard, operation) => {
    
    const copys = operation === '+' ? dataCard.copys+1 : dataCard.copys-1;

    if(copys > 0) {

      const card = deck.find( cardSearch => cardSearch.card.name === dataCard.card.name );
      card.copys = copys;

      setDeck([...deck]);

    } else {
      setDeck([...deck.filter(cardDeck => cardDeck !== dataCard)]);
    }


  }

  
  const addCard = (card) => {

    const foundCard = deck.find(cardDeck =>  cardDeck.card.name === card.name); 
    if(!foundCard) {
      setDeck([...deck, {card, copys: 1}]);
    } else {
      modifyNumberCards(foundCard, '+');
    }
  }



  return (
    <div className="row g-0">
      <div className="col my-4">
        <CardFinder clickMethod={addCard} limit={100} cols={4}/>
      </div>
      <div className="col border-start border-primary">
        <CreateDeck deck={deck} modifyNumberCards={modifyNumberCards}/>
      </div>
    </div>
  )
}
