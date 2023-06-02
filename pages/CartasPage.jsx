import { useLocation } from "react-router-dom";
import { CardsGrid } from "../components/CardsGrid"
import { FiltersCards } from "../components/FiltersCards"
import { Pagination } from "../ui/Pagination";
import { useEffect, useState } from "react";

export const CartasPage = () => {

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState({
    data: [],
    isloading: true,
  });
  const [cardsData, setCardsData] = useState({
    cards: [],
    count: 0,
  });

  const formatParamts = () => {
    if( location && location.search !== "") {
      return location.search+"&";
    } else {
      return "?";
    }
  }

  const limit = 100;
  
  const getFetch = async ( offset ) => {

    setState({
      ...cardsData,
      isLoading: true,
    });

    const resp = await fetch( `https://us-east-1.aws.data.mongodb-api.com/app/data-xeoot/endpoint/getCartas${formatParamts()}limit=${limit}&offset=${offset}` );
    const data = await resp.json();

    setState({
      data: data,
      isLoading: false,
    });

    setCardsData({cards: data[0].cards, count: data[0].totalCount[0].count });
    
}
  useEffect(() => {
    getFetch(0);
  }, [location])
  

  const pageCards = (page) => {
    setCurrentPage(page);
    getFetch( (limit*(page-1)) );
  }

  return (
  <section className="container mt-4 mb-lg-5 pb-5">
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title mb-3 text-warning">Busca tu carta</h5>
        <FiltersCards/> 
      </div>
    </div>
    <Pagination page={pageCards} currentPage={currentPage} totalCount={cardsData.count} limit={limit} isloading={state.isloading}/>
    <CardsGrid data={cardsData.cards} isloading={state.isloading}/>
    <Pagination page={pageCards} currentPage={currentPage} totalCount={cardsData.count} limit={limit} isloading={state.isloading}/>
  </section>
    
  )
}
