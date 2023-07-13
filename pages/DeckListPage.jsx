import { useRef, useState } from "react";
import { FiltersCardsDeck } from "../components/FiltersCardsDeck"
import { createRef } from "react";
import html2canvas from 'html2canvas';

export const DeckListPage = () => {

  const [card, setCard] = useState({});
  const [deck, setDeck] = useState([]);
  const [deckPrice, setDeckprice] = useState(0);

  const ref = createRef(null);

  const rulesAddCards = (card) => {
    const cardsNumber = deck.filter((c) => c.name === card.name);
    if(cardsNumber.length > 2 || deck.length > 50) {
      return false
    }  

    return true;
  }

  const onCardDetail = (card) => {
    setCard(card);
  }



  const onAddCardToDeck = (card) => {
    if(rulesAddCards(card)) {
      setDeck([...deck, card]);
      setDeckprice( deckPrice+Number(card?.price || 0) );
    } 
  }

  const onDeleteCardToDeck = (card, index) => {
    const newDeck = deck.filter((c, i) => i !== index && c )
    setDeck(newDeck);
    setDeckprice( deckPrice-Number(card?.price || 0) );
  }

  const exportRef = useRef();

  const exportAsImage = async (element, imageFileName) => {
    const canvas = await html2canvas(element, {useCORS: true} );
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    
    fakeLink.href = blob;
    
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    
    fakeLink.remove();
  };
    
  const onClearDeck = () => {
    setDeck([]);
  }

  return (
    <div className="container">
      <h2 className="text-uppercase my-4">Crea tu mazo</h2>
        <div className="row">
            <div className="col-3">
              {card?.edid 
                ?
                  <img 
                    src={`https://api.myl.cl/static/cards/${card.ed_edid}/${card.edid}.png`} 
                    className="img-fluid" 
                    alt={card.name}
                  />
                :
                  <img 
                      src={`./reverso.png`} 
                      className="img-fluid" 
                      alt={card.name}
                    />    
                  
                }
            </div>
            <div className="col-9">
                <FiltersCardsDeck onDetail={(card) => onCardDetail(card)} onAddCard={() => onAddCardToDeck (card)}/>
            </div>
        </div>
        <div  ref={exportRef} 
              className="row border position-relative mt-5"
              style={{
                backgroundImage: `url('./decklist-bg.jpg')`,
                backgroundSize: 'cover',
                minHeight: "1000px"
              }}
            >
              <div className="position-absolute bottom-100 end-50 mb-2">
              <button 
                className="btn btn-success me-2"
                >
                ${deckPrice}
              </button>
              <button 
                className="btn btn-primary me-2"
                onClick={onClearDeck}
                >
                Limpiar
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => exportAsImage(exportRef.current, "Decklist")}
                >
                Guardar <i className="bi bi-cloud-download"></i>
              </button>
              </div>
              <div className="p-1">
                { deck.map( ( card, index ) => (     
                  <div key={index} className="float-start" style={{width: '100px', margin: '2px'}}>
                      <img 
                        src={`https://api.myl.cl/static/cards/${card.ed_edid}/${card.edid}.png`} 
                        className="img-fluid border"
                        alt={card.name}
                        onClick={() => onDeleteCardToDeck(card, index)}
                        onMouseEnter={() => onCardDetail(card) }
                      />
                  </div>
        
                ))}
              </div>
            </div>
    </div>
  )
}
