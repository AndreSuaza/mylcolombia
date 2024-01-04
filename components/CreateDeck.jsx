import { useEffect, useRef, useState } from "react";
import { CardItem } from "../components/CardItem";
import { DeckListImage } from "./DeckListImage";


export const CreateDeck = ({deck, modifyNumberCards}) => {

  const [showDeckList, setShowDeckList] = useState(false);
  const [nameDeck, setNameDeck] = useState("");
  const [totalCards, setTotalCards] = useState(0);

  const modalOpenClose = () => {
    console.log('entra', showDeckList)
    setShowDeckList(!showDeckList);
  }

  const onInputChange = ({target}) => {
    setNameDeck(target.value);
  }

  useEffect(() => {

    setTotalCards(deck.reduce((a, b) => a + b.copys, 0));

  }, [deck])
  

  return (
    <>
      <section className="m-3 mb-lg-5 pb-5 position-fixed overflow-y-auto" style={{width: "48%", height: "100%"}}>
        <div className="row">
          <div className="col-6">
          <input 
            className="form-control"
            placeholder="Nombre Del Mazo"
            value={nameDeck}
            onChange={onInputChange}
          />
          </div>
          <div className="col-3">
            <div className="text-white pt-1">Total Cartas: { totalCards }</div>
          </div>
          <div className="col-3">
          <button 
            className="btn btn-primary"
            onClick={modalOpenClose}

          >
            Imagen <i className="bi bi-cloud-download"></i>
          </button>
          </div>
        </div>
        <div 
          className="row px-3 pt-4 bg-dark"
          style={{
            backgroundImage: `url('./logo-dl.png')`,
            backgroundPositionX: 'right',
            backgroundPositionY: 'bottom',
            backgroundSize: '30%',
            backgroundRepeat: 'no-repeat',
            minHeight: 120
          }}
        >
          
          {deck.map( data => data && 
              <div 
                key={data.card.id} 
                className={`col-lg-2 col-md-6 col-xs-12 mb-2 position-relative`} 
                style={{paddingRight: '0'}}
                
              >
                <div onClick={() => modifyNumberCards(data, '-')}>
                  <CardItem card={data.card} detailCard={false} />
                </div>
              <div className="lh-sm position-absolute lh-1 text-dark top-50 end-0 bg-primary col text-center">
                  <div 
                  className="border-bottom px-1 cursor-pointer"
                  style={{lineHeight: 1, paddingBottom: 3}}
                  onClick={() => modifyNumberCards(data, '+')}  
                  >+</div>
                  <div 
                    className="border-bottom px-1 bg-dark text-white" 
                    style={{lineHeight: 1, paddingBottom: 3}}
                  >
                    {data.copys}</div>
                  <div 
                  className="px-1 cursor-pointer bg-primary"
                  style={{lineHeight: 1, paddingBottom: 3}}
                  onClick={() => modifyNumberCards(data, '-')}
                  >-</div>
              </div>
              </div>
          )}          
            
      </div>
      </section>
      {showDeckList && <DeckListImage showModal={modalOpenClose} name={nameDeck} deck={deck}/>
      }
    </>
  )
}
