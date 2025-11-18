import React,{useState} from 'react';
import axios from 'axios';
import './Search.css';

export default function Search(){
    let [value, setValue]=useState("");
    let [result, setResult]=useState(null);

    
    function handleResponse(response){
        setResult( response.data[0]);
    }


    function handleSubmit(event){
        event.preventDefault();
        

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
            {result && (
                <div className="Results">
                    <h2>{result.word}</h2>
                    {result.meanings.map(function(meaning,index){
                        return(
                            <div key={index}>
                                <h3>{meaning.partOfSpeech}</h3>
                                {meaning.definitions.map(function(definition,index){
                                    return(
                                        <div key={index}>
                                            <p>{definition.definition}</p>
                                            <p><em>{definition.example}</em></p>
                                            </div>
                                        
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}