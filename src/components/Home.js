import React, { useState , useEffect } from 'react'
import Header from './Header' ;
import './Home.css' ;
import SearchIcon from '@material-ui/icons/Search' ;
import { useSelector } from 'react-redux' ;
import IconButton from '@material-ui/core/IconButton' ;
import { Dropdown } from 'react-bootstrap';
import Country from './Country' ;
import { usefetch  , fetchHomeData} from '../useFetch.js' ;
import Spinner from 'react-bootstrap/Spinner' ;
import Fade from 'react-reveal/Fade' ;

function Home() {
    const [selectValue , setSelectValue ] = useState('') ;
    const [ input , setInput ] = useState('') ;
    const [data , setData ] = useState([]) ;
    const darkTheme = useSelector(state => state.darkTheme )
    const [ search , setSearch ] = useState(false) ;
    const [ loading , setLoading ] = useState(false) ;
    const [error , setError] = useState(false) ;
    const [ tempData , setTemData ] = useState([{}]) ;
    const handleSubmit = e => {
        e.preventDefault() ;
    }
    const handleChange = e => {
        setInput(e.target.value) 
    }
    const handleData = (data) => {
        setData(data) ;
        setError(false)
    }
    const handleError = () => {
        setError(true) ;
        setData(null)
    }
    const load = () => {
        setLoading(true)
    }
    const finishedLoad = () => {
        setLoading(false)
    }
    console.log(data) ;
    useEffect(() => {
        console.log(loading , 'p')
        if ( input === '' ) {
            if ( !selectValue ) {
                console.log('fetch Home data ...')
                fetchHomeData( handleData ) ;
                setSearch(false)
            }
            console.log('load before' , loading )
            selectValue && usefetch( 'region' , selectValue , handleData , load , finishedLoad) && setLoading(true) ;
            console.log('loading after' , loading)
            selectValue && console.log('fetch region data ...')
            setSearch(false)
        } else {
            if( !selectValue ) {
                console.log(' !selecValue', selectValue)
                
                usefetch('name' , input , handleData ,handleError, load , finishedLoad) 
                
                setSearch(false)
            } else {
                console.log('doing the last one')
                usefetch('name' , input , handleData ,handleError, load , finishedLoad) 
                let tmpData = data ? data.filter((item) => {
                    return item.region === selectValue
                }) : []
                setTemData(tmpData) ;
                console.log('tmpdata =>>', tmpData)
                setSearch(true)
            }
        }
    }, [ input , selectValue ]) 

    useEffect(() => {
        setLoading(false) ;
        console.log('load finish' , loading )
        error && setLoading(false)
    }, [ data ])

console.log('porgressww' , loading)
console.log(search)
   const areas = [ 'Africa' , 'Americas' , 'Asia' , 'Europe' , 'Oceania' ] ;
    return (
        <div style={{backgroundColor: darkTheme ? '#202D36' :'#F5F5F5' , minHeight: `${window.innerHeight}px` }}>
            <Header />
            <div className='home-input'> 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='form-input' style={{ boxShadow: darkTheme && '0px 0px 5px black' , color: darkTheme && 'white' , backgroundColor: darkTheme && '#2B3743' }}>
                        <IconButton onClick={(e) => handleSubmit(e)}><SearchIcon style={{backgroundColor: darkTheme && '#2B3743' , color: darkTheme && 'white'}} /></IconButton>
                        <input type='text' onChange={(e) => handleChange(e)} value={input} placeholder='Search for a country...' className={darkTheme && 'input-dark'} style={{backgroundColor : darkTheme && '#2B3743' , color: darkTheme && 'white'}} /> 
                        { loading ? <Spinner animation='border' /> : null }
                    </div>
                </form>

                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor : darkTheme && '#2B3743' , color: darkTheme && '#CBD3DE' ,  boxShadow: darkTheme && '0px 0px 5px black'}} id="dropdown-basic">
                            {selectValue ? selectValue : 'Filter by Region'}
                    </Dropdown.Toggle>

                     <Dropdown.Menu style={{backgroundColor : darkTheme && '#2B3743' , color: darkTheme && '#CBD3DE' ,  boxShadow: darkTheme && 'none'}}>
                        <Dropdown.Item onClick={() => setSelectValue('')} >All</Dropdown.Item>
                        { areas.map((item , index) => (
                            <Dropdown.Item key={index} onClick={() => setSelectValue(areas[index])} >{item}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    
                </Dropdown>
            </div>
            
            <div className='home-body' >
                { data && !error ? data?.map((item , index) => 
                     search ? (
                        item.region ===selectValue ? <Country key={index} country={item} /> : null
                    ): <Country key={index}  country={item} />
                ) : null }
                
                
            </div>
            <div className='no-result' style={{color: darkTheme ? 'white' : 'black'}}>
                { !tempData.length && selectValue ? <Fade appear when={!tempData.length && selectValue} right><p >No results found for " <strong>{input}</strong> " in <strong>{selectValue}</strong></p></Fade> : null }
                { error && !selectValue ? <Fade appear when={error && !selectValue} right><p>No results found for " <strong>{input}</strong> " </p></Fade> : null }
            </div>
        </div>
    )
} ;

export default Home ;
