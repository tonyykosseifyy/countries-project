import React from 'react'
import './Country.css' ;
import { useSelector } from 'react-redux' ;
import Fade from 'react-reveal/Fade' ;
import { Link } from 'react-router-dom' ;

function Country({ country }) {
    const darkTheme = useSelector(state => state.darkTheme ) ;
    return (
        <Fade >
        <div className='country' style={{backgroundColor : darkTheme && '#2B3743' , color: darkTheme && 'white' ,  boxShadow: darkTheme && 'none'}}>
            <img src={country?.flag} alt={country?.name} />
            <div className='country-info'>
                <h1>{country?.name}</h1>
                <div className='country-detail' >
                    <strong>Population: <span>{country?.population}</span></strong>
                    <strong>Region: <span>{country?.region}</span></strong>
                    <strong>Capital: <span>{country?.capital}</span></strong>
                    <div className='country-go'> 
                        <Link to={`/countries/${country?.name}`}>More details</Link>
                    </div>
                </div>  
            </div>

        </div>
        </Fade>
    )
} ;

export default Country ;
 