import { useEffect, useState } from "react";
import './styles.css';

export const Banner = () => {

    const height = window.innerHeight;
    const [currentImage, setCurrentImage] = useState(0);
    const images = ['baner1.jpg','baner2.jpg'];

    useEffect(() => {
        
        const interval = setInterval(() => {
            onChangeImage();
        }, 6000);
        return () => clearInterval(interval);
        
      });

    const onChangeImage = (next = true) => {
        const condition = next ? currentImage < images.length - 1 : currentImage > 0;
        const nextIndex = next ? (condition ? currentImage + 1 : 0) : condition ? currentImage - 1 : images.length - 1;
        setCurrentImage(nextIndex);
    }

    return (
        <div className="bg-banner position-relative" 
            style={{
            backgroundRepeat: 'no-repeat',  
            backgroundPosition: 'center', 
            backgroundImage: `url('./${images[currentImage]}')`,
            backgroundSize: 'cover',
            backgroundPositionY: 0,
            backgroundPositionx: 'center',
            height: height-100,
            }}>
            {/* baner 1 */}
            { currentImage === 0 && <div className="position-absolute bottom-0 start-0 mb-5 text-center py-4" style={{width: '100%', padding: '0 20%'}}>
                <p className="font-border text-white text-uppercase fw-bold d-none d-sm-block" style={{fontSize: '3rem'}}>¿Te atreves a desafiar el destino y alcanzar la gloria?</p> 
                <a 
                    href="https://blog.myl.cl/wp-content/uploads/2021/11/Cuentos-de-Terror-Manual-Iniciatico.pdf" 
                    className="btn btn-warning text-primary fw-bold btn-lg text-uppercase mt-2 px-4"
                    target="_blank" rel="noreferrer"
                    >Aprende a jugar Mitos y Leyendas!</a>
            </div>}
             {/* baner 2 */}
             { currentImage === 1 &&<a href="https://www.instagram.com/myl_bogota_colombia/" 
                target="_blank" rel="noreferrer"    
             >  
                <div style={{width: "100%", height: '100%'}}>
                </div>
            </a> }
            <div 
                onClick={onChangeImage} 
                className="bg-button-banner position-absolute top-0 start-0 fs-1 px-2" 
                onMouseEnter={console.log('Entra')}
                style={{height: '100%'}}
            >
                <i className="position-relative top-50 bi bi-chevron-left"></i>
            </div>    
            <div 
                onClick={onChangeImage} 
                className="bg-button-banner position-absolute top-0 end-0 mr-5 fs-1 px-2" 
                style={{height: '100%'}}
            >
                <i className="position-relative top-50  bi bi-chevron-right"></i>
            </div>    
            
        </div>
    );
}
