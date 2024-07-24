import { useEffect, useRef, useState } from "react";
import { Pagination } from "../ui/Pagination"
import { CardsGrid } from "./CardsGrid"
import { FiltersCards } from "./FiltersCards"
import { useLocation } from "react-router-dom";

export const CardFinder = ({clickMethod, limit, detail = false, cols=3, pagLittle = false}) => {

  const location = useLocation();  
  const [cardsData, setCardsData] = useState({cards: [],count: 0,});
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState({data: [],isloading: true});

  const formatParamts = () => {
    if( location && location.search !== "") {
      return location.search+"&";
    } else {
      return "?";
    }
  }

  const getFetch = async ( offset ) => {

    setState({
      ...state,
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
    pageCards(1);
  }, [location])

  const pageCards = (page) => {
    setCurrentPage(page);
    getFetch( (limit*(page-1)) );
    handleClickScroll();
  }

  const handleClickScroll = () => {
    const element = document.getElementById('inicio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mt-4 mb-lg-5 pb-5 px-0">
        <div className="card my-3" >
          <div className="card-body">
              <h5 className="card-title mb-3 text-warning">Busca tu carta</h5>
              <FiltersCards/> 
          </div>
        </div>
        <div id="inicio" className="pt-4">
        <Pagination page={pageCards} currentPage={currentPage} totalCount={cardsData.count} limit={limit} isloading={state.isloading} little={pagLittle}/>
            <CardsGrid data={cardsData.cards}  cardsCol={cols} isloading={state.isloading} click={clickMethod} detailCard={detail}/>
        <Pagination page={pageCards} currentPage={currentPage} totalCount={cardsData.count} limit={limit} isloading={state.isloading} little={pagLittle}/>
        </div>
    </section>
  )
}
