import { useEffect, useState } from "react";
import { CardsGrid } from "../components/CardsGrid";


export const BanListPage = () => {

const [state, setState] = useState({
    data: [],
    isloading: true,
});

const [cardsData, setCardsData] = useState({
    cardsImperio0: [],
    cardsImperio1: [],
    cardsVcr0: [],
    cardsVcr1: [],
});


const getFetch = async () => {

    setState({
    ...state,
    isLoading: true,
    });

    const resp = await fetch( `https://us-east-1.aws.data.mongodb-api.com/app/data-xeoot/endpoint/banlist`);
    const data = await resp.json();

    setState({
        data: data,
        isLoading: false,
    });

    organizeBanList(data);
}

const organizeBanList = (data) => {

    let cardsImp0 = [];
    let cardsVCR0 = [];
    let cardsImp1 = [];
    let cardsVCR1 = [];

    data.forEach((card) => {
        card.banlist.forEach((c) => {
            c.imperio === '0' ? cardsImp0.push(card) :
            c.imperio === '1' ? cardsImp1.push(card) : null;
            c.vcr === '0' ? cardsVCR0.push(card) :
            c.vcr === '1' ? cardsVCR1.push(card) : null;
        });
    });
    
    setCardsData(
        {
            cardsImperio0: cardsImp0,
            cardsImperio1: cardsImp1,
            cardsVcr0: cardsVCR0,
            cardsVcr1: cardsVCR1,
        }
    )

}
    

useEffect(() => {
    getFetch(0);
}, [])

  return (
    <section className="container mt-5 mb-lg-5 pb-5">

        <h1 className="mt-8">Lista De Cartas Limitadas/Prohibidas</h1>
        
        {/* <div className="row mb-5 mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="py-4">VCR Prohibidas</h2>
                    <CardsGrid data={cardsData.cardsVcr0} isloading={cardsData.isloading} cardsCol={'2'} detailCard={false}/>
                    <h2 className="py-4">VCR Limitadas A Uno</h2>
                    <CardsGrid data={cardsData.cardsVcr1} isloading={cardsData.isloading} cardsCol={'2'} detailCard={false}/>
                </div>
            </div>
        </div> */}

        <div className="row mb-5 mt-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="py-4">Imperio Prohibidas</h2>
                    <CardsGrid data={cardsData.cardsImperio0} isloading={cardsData.isloading} cardsCol={'2'} detailCard={false}/>
                    <h2 className="py-4">Imperio Limitadas A Uno</h2>
                    <CardsGrid data={cardsData.cardsImperio1} isloading={cardsData.isloading} cardsCol={'2'} detailCard={false}/>
                </div>
            </div>
        </div>

  </section>
    
  )
}
