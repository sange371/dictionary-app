import React,{useState} from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import './Search.css';

export default function Search(){
    let [value, setValue]=useState("");
    let [result, setResult]=useState(null);
    let [photos, setPhotos]=useState(null);

    
    function handleResponse(response){
        setResult( response.data[0]);
    }

    function handlePexelsResponse(response){
        setPhotos(response.data.photos);

    }

    function handleSubmit(event){
        event.preventDefault();
        

        let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
        axios.get(url).then(handleResponse);

        let pexelsApiKey="Q3JFvcSE4jsCAkUWBOr1j3fNJKuakT10LgXACNfA3BuGNwdkd2YzA2yt";
        let pexelsUrl=`https://api.pexels.com/v1/search?query=${value}&per_page=1`;

        let header = { Authorization: pexelsApiKey };
        axios.get(pexelsUrl, { headers: header }).then(handlePexelsResponse);

    
    }


    function changeValue(event){
        setValue(event.target.value);
    }

    return(
        <div className="Search">
            <h1>Dictionary App</h1>
            <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Type a word..." className="searchEngine"onChange={changeValue} autoFocus/>
                <input type="submit" value="Search" className="button"/>
            </form>
            {result && (
                <div className="Results">
                    <h2>{result.word}</h2>
                    {result.phonetics.map(function(phonetic,index){
                        return(
                            <div key={index}>
                                <p className="phonetic">{phonetic.text}</p>
                                <ReactAudioPlayer src={phonetic.audio} controls  className="audio" autoPlay={false}/>
                            </div>
                        )
                    })}
                    {result.meanings.map(function(meaning,index){
                        return(
                            <div key={index}>
                                <h3>{meaning.partOfSpeech}</h3>
                                {meaning.definitions.map(function(definition,index){
                                    return(
                                        <div key={index}>
                                            <p className="definition"><strong>Definition:</strong> {definition.definition}</p>
                                            {definition.example &&(
                                                <p className="example"><em><strong>Example:</strong> {definition.example}</em></p>
                                            )}
                                            
                                            {meaning.synonyms && meaning.synonyms.length >0 && (
                                                <div className="synonyms">
                                                    <p><strong>Synonyms:</strong></p>
                                                    <ul>
                                                        {meaning.synonyms.map(function(synonym,index){
                                                            return(                                                        
                                                                <li key={index}><strong><em><small>{synonym}</small></em></strong></li>
                                                           )
                                                        })}
                                                    </ul>
                                                </div>
                                            )}   
                                        </div>    
                                    );
                                })}
                            </div>
                        );
                    })}
                    {photos &&(
                        <div className="Photos">
                            {photos.map(function(photo,index){
                                return(
                                    <img key={index} src={photo.src.medium} alt={value} className="img-fluid"/>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}