import axios from 'axios' ;

const BASE_URL = 'https://restcountries.eu/rest/v2' ;


export async function fetchCorrespondingData( endPoint , whatData , handleData ,handleError, load,finishedLoad){
    load()
    console.log('load')
    axios.get(`${BASE_URL}/${endPoint}/${whatData}`)
    .then((response) => { 
        console.log('fetching data ...')
        handleData(response.data)
    })
    .catch((err) => {
        handleError()
        finishedLoad()
    })
}
export async function fetchCountry( name , handleData , handleError ) {
    console.log(`fetching ${name} data...`)
    axios.get(`${BASE_URL}/name/${name}`) 
    .then((response) => {
        handleData(response.data[0])
    })
    .catch((error) => {
        handleError()
    })
}
export async function fetchCountryCode( codes , handleData , handleError ) {
    axios.get(`${BASE_URL}/alpha?codes=${codes}`)
    .then((response) => {
        handleData(response.data)
    })
    .catch((error) => {
        handleError()
    })
}
export function usefetch( endPoint , data , handleData,handleError, load ,finishedLoad ) {
    switch(endPoint) {
        default :
            fetchCorrespondingData( endPoint , data , handleData ,handleError, load ,finishedLoad) ;   
        }
} ;

const randomNumber = (min , max ) => {return Math.floor(Math.random() * (max - min + 1) ) + min }

export const fetchHomeData = ( handleData ) => {
    let data = [] ; 
    axios.get(`${BASE_URL}/all/`)
    .then((response) => {
        for (let i = 0 ; i < 8 ; i++ ) {
            data.push(response.data[randomNumber( 0 , 250 )])
        }
        handleData(data)
    })
    
}





/*
- Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
- Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
- Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
- Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
- Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
- White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)

- Homepage Items: 14px
- Detail Page: 16px 

- Weights: 300, 600, 800

*/