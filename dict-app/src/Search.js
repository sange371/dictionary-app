import React from 'react';
import './Search.css';

export default function Search(){
    return(
        <div className="Search">
            <form>
                <input type="search" placeholder="Type a word..."/>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}