import React, {useState, useEffect, useCallback} from 'react';
import _ from "lodash";

const Filter = (props) =>{
    const[searchTerm, setSearchTerm] = useState("");    
    const[checkData, setCheckData] = useState([]);

    const delayedQuery = useCallback(
        _.debounce((q) => props.searchData(q), 1000),
        []
      );

    useEffect(()=>{
        let checkData = [...props.checkType];
        const newCheckData = checkData.map(d=> {
            return{
                key: d.key,
                name: d.name,
                //type: d.type.charAt(0).toUpperCase() + d.type.slice(1),
                select:false
            }
        })
        //console.log(newCheckData);
        setCheckData(newCheckData);
    },[])

    const handleSearch = (e) =>{
        delayedQuery(e.target.value);
        setSearchTerm(e.target.value);
    }

    const handleChecked = (e) =>{
        //console.dir(e.target);
        const checkCategory = e.target.name;
        const isCheckedCategory = e.target.checked;
        //console.log(isCheckedCategory);
        const currentCheckData = checkData.map(d => {
            if(d.name === checkCategory){
                return{
                    key: d.key,
                    name: d.name,
                    select:isCheckedCategory
                    }   
            }
            return d;
        })
        //console.log(currentCheckData);
        setCheckData(currentCheckData);

        const checkedCat = currentCheckData.filter(category =>{
            return category.select;
        }).map(cat =>{
            return cat.key;
        })
        //console.log(checkedCat);
                
        //filtering check data
        const filterCheckData = checkedCat.length && props.airportsJson.filter((val1) => checkedCat.includes(val1.type));
        console.log(filterCheckData);
        checkedCat.length && props.searchCheckData(filterCheckData); 
        
    }
    return(
        <div className="container">
            <div className="filterByCheck">
                <span>Type</span>
                <div className="adjust">
                { checkData.map(category=>(
                    <div className="checkPosition" key={category.key}>
                        <input 
                            type="checkbox" 
                            value = {category.key}                           
                            name={category.name}
                            checked={category.select}
                            onChange={(e)=> (handleChecked(e))}
                            className="checkbox"
                        />
                        <label>{category.name}</label>
                    </div>
                ))} 
                </div>               
            </div>
            <div className="filterBySearch"> 
                <label>Filter by search</label>
                <input 
                    type="text" 
                    placeholder="Search"
                    onChange={(e)=> handleSearch(e)}
                />
            </div>
        </div>
    )
}

export default Filter;