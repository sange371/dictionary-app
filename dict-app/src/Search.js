import React,{useState} from 'react';
import './Search.css';

export default function Search(){
    let [value, setValue]=useState("");
    


    function handleSubmit(event){
        event.preventDefault();
        alert(`Searching for ${value}`);
    }
    function changeValue(event){
        setValue(event.target.value);
    }

    return(
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Type a word..." onChange={changeValue}/>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}