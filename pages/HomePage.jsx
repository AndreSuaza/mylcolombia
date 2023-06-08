import { NavLink } from "react-router-dom"
import { BannerImg } from "../ui/Banner/BannerImg"

export const HomePage = () => {

  

  return (
    <>
      <BannerImg/>
      <div className="my-4 container text-center">
        <h2 className="mb-4 text-white">Expansiones en Formato</h2>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-xs-4 mt-2">
              <img src="./exp/despertar_gotico.png" alt="" width={100}/>
          </div>
          <div className="col-lg-2 col-md-4 col-xs-4" style={{marginTop: -15}}>
              <img src="./exp/cid.png" alt="" width={100}/>
          </div>
          <div className="col-lg-2 col-md-4 col-xs-4 mt-2">
              <img src="./exp/acero.png" alt="" width={100}/>
          </div>
          <div className="col-lg-2 col-md-4 col-xs-4 mt-2">
              <img src="./exp/angeles-demonios.png" alt="" width={100}/>
          </div>
          <div className="col-lg-2 col-md-4 col-xs-4 mt-2">
              <img src="./exp/tierra-austral.png" alt="" width={100}/>
          </div>
          <div className="col-lg-2 col-md-4 col-xs-4 mt-2">
              <img src="./exp/keltoi.png" alt="" width={100}/>
          </div>
          
          <p className="my-4 text-uppercase">{'para ver al detalle el producto especial de cada expansión '}  
            <NavLink className="text-warning fw-bold" to="/cartas">
              click aquí!
            </NavLink>
          </p>
        </div>
      </div>
      
      <div className="container">
          <div className="row mb-3 mt-5">
            <div className="col-sm-6 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Manual de inicio</h5>
                  <p className="card-text text-white">¿Quieres aprender a jugar? es <b>muy</b> fácil y divertido.</p>
                  <a 
                    href="https://blog.myl.cl/wp-content/uploads/2021/11/Cuentos-de-Terror-Manual-Iniciatico.pdf" 
                    className="btn btn-primary"
                    target="_blank" rel="noreferrer"
                  >Iniciar a Jugar!</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Lista de cartas limitadas/prohibidas</h5>
                  <p className="card-text text-white">Hay poderes que se salen de las manos y destruyen del Mundo.</p>
                  <a href="https://drive.google.com/file/d/1sw0Y9N1P386fj3gtndDwxD5LzsQxewOJ/view?usp=drive_link"
                    target="_blank" rel="noreferrer"
                    className="btn btn-primary">Cuales son ?</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">DAR</h5>
                  <p className="card-text text-white">Reglamento de Mitos y Leyendas.</p>
                  <a href="https://drive.google.com/file/d/1QXm7cw3bcDSulWx7KVEZK9xUaPoIX0zm/view?usp=drive_link" 
                  target="_blank" rel="noreferrer"
                  className="btn btn-primary">Ver Documento !</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6  mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Erratas</h5>
                  <p className="card-text text-white">Ver cambios realizados a cartas.</p>
                  <a href="https://drive.google.com/file/d/1sC1kysZaMOxWZfQeDUxQ67YIA-qIQG6b/view?usp=drive_link" 
                    target="_blank" rel="noreferrer"
                    className="btn btn-primary">
                      Ver Documento !
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}
