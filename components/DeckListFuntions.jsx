import { useState } from "react"
import { Modal } from "./Modal"

export const DeckListFuntions = ({showModal, codeDeck = "", name = "Mazo", type = true, accion }) => {
  
  const [code, setCode] = useState(codeDeck);
  
  const onInputChange = ({target}) => {
    setCode(target.value);
  }

  const importDeck = () => {
    showModal();
    accion(code);
  }

  return (

    <Modal closeModal={showModal} size="50%">
        <h3>{type && "Inserte"} Codigo {name} </h3>
        <textarea 
          className="form-control mt-4 text-white" 
          placeholder="Inserte el codigo del mazo" 
          style={{height: 200}}
          onChange={onInputChange}
          defaultValue={code}
        >
        </textarea>
        { type &&  
        <button 
         className="btn btn-primary mt-2"
         onClick={importDeck}
        >
            Importar
        </button>}
    </Modal>
  )
}
