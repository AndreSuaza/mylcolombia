import { CardItem } from "./CardItem";


export const CardsGrid = ({ data, isloading, cardsCol=3, detailCard, click }) => {

    const cards = data ? data : [];

  return (
        <div className="container text-center">
            <div className="row">
                
                { isloading 
                    ?
                    <h1>Cargando... </h1>
                    :
                    cards.map( ( card ) => (
                        <div 
                            key={card.id}
                            className={`col-lg-${cardsCol} col-md-6 col-xs-12 mb-2 position-relative my-2`}
                            onClick={() => click(card)}
                            style={{paddingRight: '0'}}
                        >
                            <CardItem card={card} isloading={isloading} detailCard={detailCard}/>
                        </div>
                        
                    ))
                }

            </div>
        </div>
  )
}
