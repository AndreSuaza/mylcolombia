import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";


export const FiltersCardsDeck = ({ onDetail, onAddCard }) => {

  const { data, isLoading } = useFetch('https://us-east-1.aws.data.mongodb-api.com/app/data-xeoot/endpoint/properties');

  let filters = [];
  filters = !!data && data[0];

  const initialState = {
    term: "",
    editions: "",
    races: "",
    rarities: "",
    types: "",
    cost: "",
    force: "",
  };

  const [filtersCards, setFiltersCards] = useState(initialState);

  const [showFilters, setShowFilters] = useState(false);

  const [state, setState] = useState({
    data: [],
    isLoading: false,
  });


  const onChangeFilters = () => {
    setShowFilters(!showFilters);
  }

  const getFetch = async ( searchs, limit = 50 ) => {

    setState({
      data: [],
      isLoading: true,
    });

    const resp = await fetch( `https://us-east-1.aws.data.mongodb-api.com/app/data-xeoot/endpoint/getCartas?limit=${limit}&offset=0${searchs}` );
    const data = await resp.json();
    const cards = data[0].cards ? data[0].cards : [];
    setState({
      data: cards,
      isLoading: false,
    });
   
  }

  const formatOptions = ( options ) => {

    let formattedOptions = [];
    options.map(( option ) => {formattedOptions.push({key: option.name, value: option.id })});
    return formattedOptions;
    
  }

  const termsFormat = ( terms ) => {
    
    const text = terms.split(",");
    let termsEnd = "" ;

    if( text.length > 1 ) {
      text.map((term) => termsEnd+=term.trim()+" " ); 
      return termsEnd;
    } else {
      return '"'+terms+'"';
    }
  
  }

  const onInputChange = ({target}) => {
    setFiltersCards({
    ...filtersCards,
    term: target.value
  })
}

  const onSearchCards = () => {

    let query = '';

    if (filtersCards.term !== '') {
      query += '&text='+termsFormat(filtersCards.term);
    }

    if (filtersCards.editions !== '') {
      query += '&edition=' + filtersCards.editions;
    }
  
    if (filtersCards.races !== '') {
      query += '&race=' + filtersCards.races;
    }
  
    if (filtersCards.rarities !== '') {
      query += '&rarity=' + filtersCards.rarities;
    }
  
    if (filtersCards.types !== '') {
      query += '&type=' + filtersCards.types;
    }
  
    if (filtersCards.cost !== '') {
      query += '&cost=' + filtersCards.cost;
    }
  
    if (filtersCards.force !== '') {
      query += '&damage=' + filtersCards.force;
    }
  
    getFetch(`&${query}`);
  }

  const formatSelectedOtions = ( options ) => {
    let optionsString = "";
    options.map((option, index ) => { 
        if ( index !== 0) optionsString = optionsString+=",";
        optionsString = optionsString+option.value;
      });
    return optionsString;
  }
  
  const onSelectedOptions = (option, options) => {
    filtersCards[option] = formatSelectedOtions(options);
    setFiltersCards( filtersCards, filtersCards[option] );
  }

  const arrayObjectNumbers = [{key: 0, value: 0},{key: 1, value: 1}, {key: 2, value: 2},{key: 3, value: 3},{key: 4, value: 4},{key: 5, value: 5},
    {key: 6, value: 6},{key: 7, value: 7},{key: 8, value: 8},{key: 9, value: 9},{key: 10, value: 10}];
  const editions = filters ? formatOptions(filters.edition) : [];
  const races = filters ? formatOptions(filters.races) : [];
  const rarities = filters ? formatOptions(filters.rarities): [];
  const types = filters ? formatOptions(filters.types): [];
  const cost = arrayObjectNumbers;
  const force = arrayObjectNumbers;

  const theme = {
    chips: {
      fontSize: '8px',
      backgroundColor: '#5a0fd1',
    },
    optionContainer: {
      backgroundColor: '#160f1d',
    },
    searchBox: {
      border: '1px solid',
      borderColor: 'rgb(79, 84, 94, 0.8)',
      borderRadius: '4px',
    },
    option: {
      backgroundColor: '#160f1d',
    }
  };

  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col-12 mb-1">
          <div className="row">
          <div className="col-11">
            <input 
              className="form-control"
              placeholder="Palabra o Termino"
              value={filtersCards.term}
              onChange={onInputChange}
            />
          </div>
          <div className="col-1">
            <button onClick={onSearchCards} className="btn btn-primary">Buscar</button>
          </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <span 
              style={{cursor: 'pointer', fontSize: 10}} 
              className="me-2"
              onClick={onChangeFilters}
            >{ showFilters ? "Ocultar Filtros" : "Ver Filtros" }  <i className="bi bi-filter-right"></i></span>
          </div>
          <div className={`row show ${!showFilters && `visually-hidden`}`} >
            <div className="col-12 my-1">
              <Multiselect
                displayValue="key"
                options={editions}
                showCheckbox
                placeholder="Buscar Edicion"
                onRemove={(options) => onSelectedOptions("editions", options) }
                onSelect={(options) => onSelectedOptions("editions", options) }
                showArrow={true}
                customArrow={<i className="bi bi-chevron-down"></i>}
                isLoading={isLoading}
                style={theme}
              />
            </div>
            <div className="col-12">
              <Multiselect
                displayValue="key"
                options={races}
                showCheckbox
                placeholder="Buscar Raza"
                onRemove={(options) => onSelectedOptions("races", options) }
                onSelect={(options) => onSelectedOptions("races", options) }
                showArrow={true}
                customArrow={<i className="bi bi-chevron-down"></i>}
                isLoading={isLoading}
                style={theme}
              />
            </div>
            <div className="col-12 my-1">
              <Multiselect
                displayValue="key"
                options={rarities}
                showCheckbox
                placeholder="Buscar Rareza"
                onRemove={(options) => onSelectedOptions("rarities", options) }
                onSelect={(options) => onSelectedOptions("rarities", options) }
                showArrow={true}
                customArrow={<i className="bi bi-chevron-down"></i>}
                isLoading={isLoading}
                style={theme}
              />
            </div>
            <div className="col-12 my-1">
              <Multiselect
                displayValue="key"
                options={types}
                showCheckbox
                placeholder="Buscar Tipo"
                onRemove={(options) => onSelectedOptions("types", options) }
                onSelect={(options) => onSelectedOptions("types", options) }
                showArrow={true}
                customArrow={<i className="bi bi-chevron-down"></i>}
                isLoading={isLoading}
                style={theme}
              />
            </div>
            <div className="col-6 my-1">
              <Multiselect
                displayValue="key"
                options={cost}
                showCheckbox
                placeholder="Buscar Costo"
                onRemove={(options) => onSelectedOptions("cost", options) }
                onSelect={(options) => onSelectedOptions("cost", options) }
                showArrow={true}
                customArrow={<i className="bi bi-chevron-down"></i>}
                isLoading={isLoading}
                style={theme}
              />
            </div>
            <div className="col-6 my-1">
              <Multiselect
                displayValue="key"
                options={force}
                showCheckbox
                placeholder="Buscar Fuerza"
                onRemove={(options) => onSelectedOptions("force", options) }
                onSelect={(options) => onSelectedOptions("force", options) }
                showArrow={true}
                customArrow={<i className="bi bi-chevron-down"></i>}
                isLoading={isLoading}
                style={theme}
              />
            </div>

            

            
          </div>
         
        </div>
      </div>
      <div>
        <div className="row border overflow-y-auto" style={{height: 230}}>      

        { state.isLoading ?
          <h2 className="text-warning mt-2">Cargando ...</h2>
          : 
          state.data.map( ( card, index ) => (     
         
            <div key={index} className="col-2 p-1">
                <img 
                  src={`https://api.myl.cl/static/cards/${card.ed_edid}/${card.edid}.png`} 
                  className="img-fluid border" 
                  alt={card.name}
                  onMouseEnter={() => onDetail(card) }
                  onClick={ ()=>onAddCard(card) }
                />
            </div>
          
          ))
        }
        
        </div>
      </div>
    </div>
  )
}
