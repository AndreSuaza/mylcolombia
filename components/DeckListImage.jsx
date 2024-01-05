import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { CardItem } from './CardItem';
import { Modal } from './Modal';

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

    <Modal closeModal={showModal}>
      <div className='text-end position-absolute top-0 end-0 m-4'>
          <button 
              className="btn btn-primary me-4"
              onClick={() => exportAsImage(exportRef.current, name)}
              >
              Guardar <i className="bi bi-cloud-download"></i>
          </button>
      </div>
      <div 
        id='mainImage'
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
          minWidth: '1200px',
          minHeight: '230px'
        }}
      >
        

        <h1 className="text-white mb-4">Mazo {name}</h1>
          {deck.map( data => data && 
            <div key={data.card.id} className={`col-2 mb-4 position-relative`} style={{paddingRight: '0'}}>
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
    </Modal>
  )
}
