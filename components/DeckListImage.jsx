import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { CardItem } from './CardItem';

export const DeckListImage = ({showModal, name, deck}) => {

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

  return (
    <section>
          <div className="modalMyl">
            
            <div className="modalMyl-content bg-dark position-relative p-4 border border-primary rounded" style={{minHeight: "90%"}} >
              <div className="close text-right position-absolute end-0 ">
                
                <button 
                    className="btn btn-primary me-4"
                    onClick={() => exportAsImage(exportRef.current, "Decklist")}
                    >
                    Guardar <i className="bi bi-cloud-download"></i>
                </button>
                <span className="me-3" onClick={() => showModal()}>&times;</span>
              </div>
              <div 
                className="row bg-dark mt-2" 
                ref={exportRef}
                style={{
                  backgroundImage: `url('./logo-dl.png')`,
                  backgroundPositionX: 'right',
                  backgroundPositionY: 'bottom',
                  backgroundSize: '30%',
                  backgroundRepeat: 'no-repeat',
                  minHeight: 120,
                  paddingBottom: 40,  
                }}
              >
                <h1 className="text-white mb-4">Mazo {name}</h1>
                {deck.map( data => data && 
                    <div key={data.card.id} className={`col-lg-2 col-md-6 col-xs-12 mb-4 position-relative`} style={{paddingRight: '0'}}>
                      <CardItem card={data.card} detailCard={false}/>
                      <div 
                        className="lh-sm position-absolute lh-1 text-dark top-0 end-50 col text-center bg-primary p-2 rounded"
                        style={{marginTop: -15, marginRight: -15}}
                      >
                          <div className="fs-4 text-dark text-center fw-bold">
                            {data.copys}
                          </div>
                      </div>
                    </div>
                )}      
              </div>
               
            </div>
          </div>
      </section>
  )
}
