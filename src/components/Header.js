import React from 'react'
import './Header.css' ;
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined' ;
import Brightness2Icon from '@material-ui/icons/Brightness2' ;
import IconButton from '@material-ui/core/IconButton' ;
import { toggleTheme } from '../actions' ;
import { useDispatch , useSelector } from 'react-redux' ;
 
function Header() {
    const dispatch = useDispatch() ;
    const darkTheme = useSelector(state => state.darkTheme) ;
    return (
        <div className='header' style={{backgroundColor: darkTheme && '#2B3743'  , color : darkTheme && 'white' , boxShadow: darkTheme && '0px .3px 10px black '}}>
            <h1>Where in the world?</h1>
            <div className='header-right'>
                <IconButton onClick={() => dispatch(toggleTheme())}>
                    { !darkTheme ? <Brightness2OutlinedIcon /> : <Brightness2Icon style={{color: 'white'}} />}
                </IconButton >
                <h1>Dark Mode</h1>
            </div>
        </div>
    )
} ;

export default Header
