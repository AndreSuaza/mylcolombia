import { CardItem } from "./CardItem";


export const CardsGrid = ({ data, isloading, cardsCol, detailCard }) => {

    const cards = data ? data : [];

  return (
        <div className="container text-center">
            <div className="row">
                
                { isloading 
                    ?
                    <h1>Cargando... </h1>
                    :
                    cards.map( ( card ) => (

                        
                        <CardItem key={ card.id } card={card} isloading={isloading} cardsCol={cardsCol}  detailCard={detailCard}/>
                        
                    ))
                }

            </div>
        </div>
  )
}
