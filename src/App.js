import React, {useState, useEffect} from 'react';
import './App.css';
import airportsJson from './data/airports';

//Components
import Title from './Components/Title';
import Table from './Components/Table';
import Pagination from './Components/Pagination';
import Filter from './Components/Filter';


const App = () =>{
  const[loading, setLoading] = useState(false);
  const[data, setData] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[dataPerPage] = useState(4);
  const[totalResults, setTotalResults] = useState(airportsJson.length);

  //get currentData
  const indexOfLastData = currentPage * dataPerPage; //4
  const indexOfFirstData = indexOfLastData - dataPerPage; //0
  const currentData = airportsJson.slice(indexOfFirstData,indexOfLastData);

  const headers = [
    {name : 'Name', key:'name'},
    {name : "ICAO", key:'icao'},
    {name : "IATA", key:'iata'},
    {name : "Elev.", key:'elevation'},
    {name : "Lat.", key:'latitude'},
    {name : "Long.", key:'longitude'},
    {name : "Type", key:'type'}
  ];
  const checkType = [
    {name : 'Small', key:'small'},
    {name : "Medium", key:'medium'},
    {name : "Large", key:'large'},
    {name : "Heliport", key:'heliport'},
    {name : "Closed", key:'closed'},
    {name : "In your favorites", key:'in_your_favorites'}
  ];
  
  const prevPage = () =>{
    setCurrentPage(page => page - 1);
    setData(currentData);
  }

  const nextPage = () =>{
    setCurrentPage(page => page + 1);
    setData(currentData);
  }
  
  const searchData = (value) =>{
    //console.log(value);
    const filterData = airportsJson.filter(val =>  (val.name.toLowerCase().startsWith(value.toLowerCase()) ||
                                                    val.icao.toLowerCase().startsWith(value.toLowerCase()) ||
                                                    (val.iata && val.iata.toLowerCase().startsWith(value.toLowerCase())) ||
                                                    (val.elevation === value) ||
                                                    (val.latitude === value) ||
                                                    (val.longitude === value)));
    //console.log(filterData.length);
    const filterDataUpdated = filterData.slice(indexOfFirstData,indexOfLastData);                                              
    setData(filterDataUpdated);
    setTotalResults(filterData.length);
  }
  
  const searchCheckData = (filterCheckData) =>{
      const filterCheckDataUpdated = filterCheckData.slice(indexOfFirstData,indexOfLastData); 
      setData(filterCheckDataUpdated);
      filterCheckData.length ? setTotalResults(filterCheckData.length) : setTotalResults(airportsJson.length)
  }

  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem('Data'));
    if(items){
      setData(items);
    }
    
  },[]);

  useEffect(()=>{
      setLoading(true);
      localStorage.setItem('Data', JSON.stringify(currentData)); 
      setLoading(false); 
  },[]);

  return (
    <div className="App">
      {loading ? 'loading.....' : 
      <>
        <Title 
          title='Filter' 
          titleSpan='airports'
        />
        <Filter checkType={checkType} 
          searchData={(value) =>searchData(value)} 
          airportsJson={airportsJson} 
          searchCheckData={(value)=> searchCheckData(value)}/>
        <Table 
          headers={headers} 
          currentData={data}
        />
        <Pagination 
          currentPage={currentPage}
          firstPage={indexOfFirstData+1} 
          lastPage={indexOfLastData} 
          totalResults={totalResults} 
          prevPage={prevPage} 
          nextPage={nextPage}
        /> 
      </>
      }
      
    </div>
  );
}

export default App;
