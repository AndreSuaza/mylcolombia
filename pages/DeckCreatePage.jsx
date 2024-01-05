import { CreateDeck } from "../components/CreateDeck";
import { CardFinder } from "../components/CardFinder";
import { useEffect, useState } from "react";
import { DeckListImage } from "../components/DeckListImage";
import { DeckListFuntions } from "../components/DeckListFuntions";

export const DeckCreatePage = () => {

  const [deck, setDeck] = useState([]);
  const [showDeckList, setShowDeckList] = useState(false);
  const [showExportDeckList, setShowExportDeckList] = useState(false);
  const [showImportDeckList, setShowImportDeckList] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [nameDeck, setNameDeck] = useState("");
  const [codeDeck, setCodeDeck] = useState("");

  useEffect(() => {

    setTotalCards(deck.reduce((a, b) => a + parseInt(b.copys), 0));

  }, [deck])

  const onInputChange = ({target}) => {
    setNameDeck(target.value);
  }

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

  const modalOpenClose = () => {
    setShowDeckList(!showDeckList);
  }

  const modalOpenCloseExportDeckList = () => {
    setShowExportDeckList(!showExportDeckList);
  }

  const modalOpenCloseImportDeckList = () => {
    setShowImportDeckList(!showImportDeckList);
  }

  const getFetch = async ( decklist ) => {

    const resp = await fetch( `https://us-east-1.aws.data.mongodb-api.com/app/data-xeoot/endpoint/getDecklist?decklist=${decklist}` );
    const data = await resp.json();

    return data;
  }

  const createDeckList = ( deckOrigin, cards) => {
    const deck = [];

    cards.forEach(card => {
      for (let index = 0; index < deckOrigin.length; index++) {
        if(card.id === deckOrigin[index])
          deck.push({card, copys: deckOrigin[index+1] > 0 ? deckOrigin[index+1] : 0 })
      }
    });

    setDeck(deck);

  }

  const exportDeck = () => {
    let exportText = "";
    deck.map( data => exportText = exportText+data.card.id+","+data.copys+",");
    setCodeDeck(exportText);
    setShowExportDeckList(true);
   
  }

  const importDeck = ( code ) => {
    //let code = "14431,3,14430,1,14432,1,14433,2,14434,2,14436,2,14437,2,14435,2,14438,1,14439,2,14440,2,14443,2,14442,1,14441,1,14444,1,14445,1,14446,1,"

    let deckListIds = "";
    
    const decklist = code.split(',');
    const ids = decklist.filter ( (elemet, index) => !(index % 2) );
    
    ids.map( data => deckListIds = deckListIds+data+",");
   
    getFetch(deckListIds).then( data => createDeckList(decklist, data));

  }

  const sortByType = () => {
    console.log('sss',deck)
    const aliados = [], talismanes = [], armas = [], oros = [], totems = [], otros = [];

    deck.map( data => {

      switch (data.card.type) {
        case "1":
          aliados.push(data);
          break;
        case "2":
          talismanes.push(data);
          break;
        case "3":
          armas.push(data);
        break;
        case "4":
          totems.push(data);
          break;  
        case "5":
          oros.push(data);
          break;
        default:
          otros.push(data);
          break;
      }

    })
    
    const sortedDecklist = [...aliados, ...talismanes, ...armas, ...totems, ...oros, ...otros];
    setDeck(sortedDecklist);
  }

  const clearDeck = () => {
    setDeck([]);
  }

  return (
    <div className="row g-0">
      <div className="col my-4">
        <CardFinder clickMethod={addCard} limit={100} cols={4} pagLittle={true}/>
      </div>
      <div className="col border-start border-primary">
        <section className="my-3 mb-lg-5 pb-5 position-fixed overflow-y-auto" style={{width: "48%", height: "100%"}}>
        <div className="row mx-3">
            <div className="col-lg-3 col-md-6 col-xs-12 mb-2">
            <input 
              className="form-control"
              placeholder="Nombre Del Mazo"
              value={nameDeck}
              onChange={onInputChange}
            />
            </div>
            <div className="col-lg-2 col-md-6 col-xs-12 mb-2">
              <div className="text-white pt-1"># Cartas: { totalCards }</div>
            </div>
            <div className="col-lg-7 col-md-6 col-xs-12 mb-2 text-start">
              <button 
                className="btn btn-primary m-1"
                onClick={modalOpenClose}

              >
                <i class="bi bi-card-image"></i>
              </button>

              <button 
                className="btn btn-primary m-1"
                onClick={exportDeck}

              >
                Exportar 
              </button>

              <button 
                className="btn btn-primary m-1"
                onClick={modalOpenCloseImportDeckList}

              >
                Importar
              </button>
              <button 
                className="btn btn-primary m-1"
                onClick={sortByType}

              >
               <i class="bi bi-list-ol"></i>
              </button>
              <button 
                className="btn btn-primary m-1"
                onClick={clearDeck}

              >
               <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <CreateDeck deck={deck} modifyNumberCards={modifyNumberCards}/>
          </section>
          {showDeckList && <DeckListImage showModal={modalOpenClose} name={nameDeck} deck={deck}/>}
          {showExportDeckList && <DeckListFuntions showModal={modalOpenCloseExportDeckList} codeDeck={codeDeck} type={false} />}
          {showImportDeckList && <DeckListFuntions showModal={modalOpenCloseImportDeckList} name={nameDeck} accion={importDeck}/>}
      </div>
    </div>
  )
}
