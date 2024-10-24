import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";

export const CardItem = ({ card , detailCard = true, clickInImage, zoom = true}) => {

  const { edid, ed_edid: edition , name, banlist = [] ,price } = card;

  const imageCard = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showDeckList , setShowDeckList] = useState(false);

  const onImageLoaded = () => setLoaded(true);

  const divRef = useRef(null);

  useEffect(() => {
    const imgElCurrent = imageCard.current;

    if (imgElCurrent.complete && imgElCurrent.naturalHeight !== 0) {
        setLoaded(true);
    } else if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded);
    }
    
    return () => imgElCurrent.removeEventListener('load', onImageLoaded);
  }, [imageCard]);

  const modalOpenClose = () => {
    setShowDeckList(!showDeckList);
  }

  return ( 
      <div className="position-relative">
        {zoom && <div 
          className="position-absolute bottom-0 start-0 bg-primary px-1"
          onClick={modalOpenClose}
        >
          <i class="bi bi-zoom-in text-white"></i>
        </div>}
        <div onClick={clickInImage}>
        <img 
          src='./reverso.png' 
          className="img-fluid mb-2" 
          alt={name}
          style={!loaded ? { display: 'inline-block', width: "100%" } : { display: 'none' }}
        />
        { !loaded && 
          <>
          <div className="position-absolute top-0 end-0 me-3 mt-2"> 
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="position-absolute top-0 start-0 me-3 mt-2"> 
            <p className="bg-primary text-white bg-opacity-75 fs-6 px-2 rounded-end ms-2">{card.name}</p>
          </div>
          </>
        }
        <img 
          ref={imageCard}
          src={`https://api.myl.cl/static/cards/${edition}/${edid}.png`} 
          className="img-fluid" 
          alt={name}
          style={loaded ? { display: 'inline-block', width: "100%" } : { display: 'none' }}
        />
        </div>
        {(detailCard && price ) && 
          <div className="position-absolute bottom-0 end-0 ">
            <p className="bg-success text-white bg-opacity-75 fs-6 px-2 rounded-start">{` $ ${price} `}</p>
          </div>
        }
        { detailCard && banlist.map((ban, index) => {
          return <div key={index} className="position-absolute top-0 end-0" style={{marginTop: 50}}>
            {ban['imperio'] &&  <span className="bg-danger text-white bg-opacity-75 fs-6 px-2 rounded-start d-block mb-1 text-start">{`Imp: ${ban['imperio']}`}</span>}
            {ban['vcr']  && <span className="bg-primary text-white bg-opacity-75 fs-6 px-2 rounded-start d-block mb-1 text-start" style={{marginTop:30}}>{`Vcr: ${ban['vcr']}`}</span>}
          </div>
        })}
        {showDeckList && <Modal closeModal={modalOpenClose} size="30%" >
          <img 
            ref={imageCard}
            src={`https://api.myl.cl/static/cards/${edition}/${edid}.png`} 
            className="img-fluid" 
            alt={name}
          />
        </Modal>}
      </div>
  )
}
