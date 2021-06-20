import React, {useState, useEffect} from 'react';

const Filter = (props) =>{
    const[searchTerm, setSearchTerm] = useState("");
    const[categories, setCategories] = useState(null);
    const[currentCategories, setCurrentCategories] = useState([]);
    

    useEffect(()=>{
        const category = props.checkType.map((category) =>{
            return {name: category.name, check: false}
        })
        setCurrentCategories(category);
        setCategories(category);
        // console.log(categories);
    },[])

    const handleSearch = (e) =>{
        e.preventDefault();
        setSearchTerm(e.target.value);
        console.log(searchTerm);
        props.searchData(searchTerm);
    }
    const handleChecked = (e) =>{
        console.dir(e.target);
        const checkCategory = e.target.name;
        const isCheckedCategory = e.target.checked;
        console.log(isCheckedCategory);
        const updated = currentCategories.map((category) =>{
            if(category.name === checkCategory)
            return {name:category.name, check:isCheckedCategory}

            return category;
        })
        const checkedCat = updated.filter(category =>{
            return category.check;
        })
        console.log(checkedCat);
        const catNames = checkedCat.map(cat =>{
            return cat.name;
        })
        console.log(catNames);
        const trial2 = catNames.join(',');
        console.log(trial2);
        setCurrentCategories(updated);
        console.log(currentCategories);
        // props.searchCheckData(catNames);
        const trial = props.airportsJson.filter(val1 => (catNames.includes(val1.type) ));
        props.searchCheckData(trial);
        // setCategories(e.target.checked);
        // //const currentIndex = check.lastIndexOf(1);
        // console.log(e,categories);
    }
    return(
        <div className="container">
            <div className="filterByCheck">
            <span>Type</span>
                { (!categories) ?
                     <span>Loading......</span>
                 : categories.map(category=>(
                    <div className="checkPosition" key={category.name}>
                        <input 
                            type="checkbox" 
                            value = {category.name}                           
                            name={category.name}
                            onChange={(e)=> handleChecked(e)}
                        />
                        <label>{category.name}</label>
                    </div>
                ))}
                {/* <div className="checkPosition" key='small'>
                        <input 
                            type="checkbox" 
                            value = 'small'                           
                            name='small'
                            onChange={(e)=> handleChecked(e)}
                        />
                        <label>small</label>
                </div>
                <div className="checkPosition" key='large'>
                        <input 
                            type="checkbox" 
                            value = 'large'                           
                            name='large'
                            onChange={(e)=> handleChecked(e)}
                        />
                        <label>large</label>
                </div> */}
                
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