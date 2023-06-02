import { useState } from "react";

export const Banner = () => {

    const [height, setHeight] = useState(window.innerHeight)

    return (
        <div className="position-relative" 
            style={{
            backgroundRepeat: 'no-repeat',  
            backgroundPosition: 'center', 
            backgroundImage: "url('./baner1.jpg')",
            backgroundSize: 'cover',
            backgroundPositionY: 0,
            backgroundPositionx: 'center',
            height: height-100,
            }}>
            <div  className="position-absolute top-0 start-0 mb-5 text-start col-5 bg-dark bg-opacity-25 py-4" style={{marginTop: height/6}}>
                <p  className="fw-semibold text-white text-uppercase ms-5 fw-bold" style={{fontSize: '3rem'}}>¿Te atreves a desafiar el destino y alcanzar la gloria?</p> 
            </div>
        </div>
    );
}
