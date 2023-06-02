import { useEffect, useRef, useState } from "react";
import { TYPES, RACES } from "../constants/constants";

export const CardItem = ({ card , isloading }) => {

  const { edid, ed_edid: edition , name, banlist = [] ,price } = card;

  const imageCard = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetail] = useState(false);

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

  useEffect(() => {
    if(detail) {
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      });
    } else {
      imageCard.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      });
    }
  }, [detail])

  const onShowDetail = () => {
    setDetail(!detail);
  }

  return ( 
    <>
    <div 
      className="col-lg-3 col-md-6 col-xs-12 mb-2 position-relative"
      onClick={onShowDetail}
    >
      { !detail && 
      <>
        <img 
          src='./reverso.png' 
          className="img-fluid mb-2" 
          alt={name}
          style={!loaded ? { display: 'inline-block', width: "100%" } : { display: 'none' }}
        />
        <img 
          ref={imageCard}
          src={`https://api.myl.cl/static/cards/${edition}/${edid}.png`} 
          className="img-fluid mb-2" 
          alt={name}
          style={loaded ? { display: 'inline-block', width: "100%" } : { display: 'none' }}
        />
        {price && 
          <div className="position-absolute bottom-0 end-0 ">
            <p className="bg-success text-white bg-opacity-75 fs-6 px-2 rounded-start">{` $ ${price} `}</p>
          </div>
        }
        { banlist.map((ban, index) => {
          return <div key={index} className="position-absolute top-0 end-0" style={{marginTop: 50}}>
            {ban['imperio'] &&  <span className="bg-danger text-white bg-opacity-75 fs-6 px-2 rounded-start d-block mb-1 text-start">{`Imp: ${ban['imperio']}`}</span>}
            {ban['vcr']  && <span className="bg-danger text-white bg-opacity-75 fs-6 px-2 rounded-start d-block mb-1 text-start" style={{marginTop:30}}>{`Vcr: ${ban['vcr']}`}</span>}
          </div>
        })}   
      </>
    }
    </div>
    { detail && <div ref={divRef} className="col-lg-12 col-md-12 col-xs-12 mb-4">
      <div className="card position-relative">
        <div className="row g-0">
          <div className="col-md-4">
            <img 
              ref={imageCard}
              src={`https://api.myl.cl/static/cards/${edition}/${edid}.png`} 
              className="img-fluid mb-2" 
              alt={name}
              style={loaded ? { display: 'inline-block', width: "100%" } : { display: 'none' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body text-start mt-4 mx-3">
              <div className="row">
              <h5 className="card-title text-capitalize fs-3 text">{card.name}</h5>
              <div className="row">
              { banlist.map((ban) => {
                return <>
                  { ban['imperio'] && <p className="text-danger col-6">Limitado en Imperio a: <b>{ban['imperio']}</b> </p> }
                  { ban['vcr'] && <p className="text-danger col-6">Limitado en VCR a: <b>{ban['vcr']}</b></p> }
                </>
              })} 
              </div>
              </div>
              { card.type && <p className="text-white"><b>Tipo:</b>  { TYPES.find((type) => type.id === card.type )?.name}</p> }
              { card.damage && <p className="text-white"><b>Fuerza:</b>  {card.damage}</p> }
              { card.race && <p className="text-white"><b>Raza:</b>  { RACES.find((race) => race.id === card.race )?.name}</p> }
              { card.cost && <p className="text-white"><b>Coste:</b> {card.cost}</p> }
              <p className="card-text text-white">{card.ability}</p>
              { price && <p className="card-text text-success"><b>Precio:</b>  {`$${price}`}</p>}
              <div>
                <strong>Aviso!</strong><p style={{fontSize: 12}}> El precio que se muestra en esta página es una estimación y no representa el valor <b>Real</b>.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute me-2 mt-2 top-0 end-0" onClick={onShowDetail}>
          <h1 style={{cursor: 'pointer'}}><i className="bi bi-x-square"></i></h1>
        </div>
      </div>
    </div>}
    </>
  )
}
