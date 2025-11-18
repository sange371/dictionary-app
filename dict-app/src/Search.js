import React,{useState} from 'react';
import axios from 'axios';
import './Search.css';

export default function Search(){
    let [value, setValue]=useState("");
    
    function handleResponse(response){
        console.log( response.data[0]);
    }


    function handleSubmit(event){
        event.preventDefault();
        alert(`Searching for ${value}`);

        let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
        axios.get(url).then(handleResponse);
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