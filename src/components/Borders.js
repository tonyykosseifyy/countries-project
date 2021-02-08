import React, { useState , useEffect } from 'react'
import './Borders.css' ;
import { fetchCountryCode } from '../useFetch.js' ;
import { Link } from 'react-router-dom' ;
import { useSelector } from 'react-redux' ;
import Fade from 'react-reveal/Fade' ;

function Borders({ countryBorders }) {
    const darkTheme = useSelector(state => state.darkTheme) ;
    const [ borders , setBorders ] = useState(countryBorders) ;
    const [ data , setData ] = useState([])
    const [ error , setError ] = useState(false) ;
    
    const handleData = (data) => {
        setData(data.slice(0 , 3))
    }
    const handleError = () => {
        setError(false)
    }
    useEffect(() => {
        let codes = borders.join(';')
        setBorders(countryBorders)
        setData([])
        fetchCountryCode( codes , handleData , handleError )
    },[ borders , countryBorders ])

    console.log('borders=>>' , borders)
    console.log('data=>>' , data)
    console.log('error=>>' , error)
    console.log('data slice' , data.slice(0 , 3))
    return (
        <div className='borders' style={{}}>
            { data && data?.map((item , index) => (
                <Fade right >
                    <Link className='borders-link' 
                        to={`/countries/${item.name}`} 
                        key={index} 
                        style={{background: darkTheme && '#2B3743' , boxShadow: darkTheme && '0px 0px 5px black' }}
                    >
                        <span>{item.name}</span>
                    </Link>
                </Fade>
            ))}
        </div>
    )
} ;

export default Borders ;
