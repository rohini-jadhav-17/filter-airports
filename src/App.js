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
    {name : "In your favorites", key:'in your favorites'}
  ];
  //looping through airportsJson
  useEffect(()=>{
    const fetchAirports = () =>{
      setLoading(true);
      const res = airportsJson;
      console.log(res);
      setData(res);
      setLoading(false);
    }
    fetchAirports()
  },[]);

  
  const prevPage = () =>{
    setCurrentPage(page => page - 1);
  }

  const nextPage = () =>{
    setCurrentPage(page => page + 1)
  }
  
  return (
    <div className="App">
      <Title 
        title='Filter' 
        titleSpan='airports'
      />
      <Filter checkType={checkType}/>
      <Table 
        headers={headers} 
        currentData={currentData}
      />
      <Pagination 
        currentPage={currentPage}
        firstPage={indexOfFirstData+1} 
        lastPage={indexOfLastData} 
        totalResults={airportsJson.length} 
        prevPage={prevPage} 
        nextPage={nextPage}
      /> 
    </div>
  );
}

export default App;
