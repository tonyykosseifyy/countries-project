import React, { useState , useEffect } from 'react'
import './SingleCountry.css' ;
import Header from './Header' ;
import { useParams , useHistory } from 'react-router-dom' ;
import { useSelector } from 'react-redux' ;
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt' ;
import { fetchCountry } from '../useFetch.js' ;
import Borders from './Borders'
import Fade from 'react-reveal/Fade' ;
import Map from './Map' ;
import { Helmet } from 'react-helmet' ;

function SingleCountry() {
    const darkTheme = useSelector(state => state.darkTheme ) ;
    const [ data , setData ] = useState()
    const [ error , setError ] = useState(false) ;
    let { countryId } = useParams() ;
    let history = useHistory() ;
    console.log('history =>>' , history)
    console.log(data)
    const back = () => {
        history.goBack()
    }
    const handleData = (country) => {
        setData(country)
        setError(false)
    }
    const handleError = () => {
        setError(true)
    }
    useEffect(() => {
        fetchCountry( countryId , handleData , handleError )
    }, [ countryId ])
    console.log(data )
    console.log('data borders=>>', data?.borders)
    return (
        <div style={{backgroundColor: darkTheme ? '#202D36' :'#F5F5F5' ,  minHeight: `${window.innerHeight}px`}}>
            <Helmet>
                <title>Discover Countries | Countries </title>
            </Helmet>
            <Header style={{position: 'relative'}} />
             <div className='single-country' style={{boxShadow: darkTheme && 'none' , color: darkTheme && 'white' , backgroundColor: darkTheme && '#202D36' }} >
                <button style={{background: darkTheme ? '#2B3743' : 'white' , boxShadow: darkTheme && '0px 0px 5px black' }} onClick={() => back()}>
                    <ArrowRightAltIcon className='go-back' />
                    <span>Back</span>
                </button>
            { !error ?
                <div className='main-content' >
                    <Fade><div className='left-content'><img src={data?.flag} alt={data?.name} /></div></Fade>
                    <Fade><div className='right-content'>
                        <h1>{data?.name}</h1>
                        <div className='single-country-info' >
                            <div className='country-info-left'>
                                <ul>
                                    <li><strong>Native Name: </strong>{data?.nativeName}</li>
                                    <li><strong>Population: </strong>{data?.population}</li>
                                    <li><strong>Region: </strong>{data?.region}</li>
                                    <li><strong>Sub Region: </strong>{data?.subregion}</li>
                                    <li><strong>Capital: </strong>{data?.capital}</li>
                                </ul>
                            </div>
                            <div className='country-info-right'>
                                <ul>
                                    <li><strong>Top Level Domain: </strong>{data?.topLevelDomain}</li>
                                    <li><strong>Currencies: </strong>{data?.currencies.map((item , index) => (
                                        <span key={index}> {item.name}{ index + 1 === data.currencies.length ? '.' : ',' }</span>
                                    ))}</li>
                                    <li><strong>Languages: </strong>{data?.languages.map((item , index) => (
                                        <span key={index}> {item.name}{ index + 1 ===data.languages.length ? '.' : ','}</span>
                                    ))}</li>
                                </ul>
                            </div>
                        </div>
                        {data?.borders.length ? <div className='bottom-info'>
                            <strong>Border Countries: </strong>
                            {data && <Borders countryBorders={data?.borders} />}
                            {console.log('data borders =>>' , data?.borders)}
                        </div>: null }
                    </div> </Fade>
                </div> : 
                    <Fade appear when={error} right>
                        <div className='no-result-cont' style={{color: darkTheme ? 'white' : 'black'}}>
                            <p>No results found for " <strong>{countryId}</strong> "  <button className='no-result-button' onClick={() => back()}>Go back ?</button></p>       
                        </div>
                    </Fade> }
            </div> 
            { !error ? 
            <div className='map-country-container'>
                <Map countryPosition={data?.latlng} name={data?.name} />
            </div>
            
             : null }
        </div>
    )
} ;

export default SingleCountry ;