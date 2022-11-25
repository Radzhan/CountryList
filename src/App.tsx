import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

interface Country { 
  name: string;
  alpha3Code: string;
}

function App() {
  const UrlWithName = 'https://restcountries.com/v2/all?fields=alpha3Code,name'
  const UrlWithcode = 'https://restcountries.com/v2/alpha/'

  const [name, setName] = useState<Country[]>([])

  useEffect(() => {
    const setCountry = async () => {
      const responseArr= await axios.get<Country[]>(UrlWithName)
  
      const promises = responseArr.data.map(async country => {
        setName(prev => [...prev , country])
      })
    }

    setCountry()
  }, [])

  const enterToConsole = async (code: string) => {
    const responseCode = await axios.get(UrlWithcode + code)

    const borders = responseCode.data.borders

    if (borders){
      for (let i = 0; i < borders.length; i++){
        const countryBorders = await axios.get(UrlWithcode + borders[i])
  
        console.log(countryBorders.data.name)
      }
    }else {
      console.log('this country has no borders')
    }

  } 

  const createCountrys = name.map( createCountry => {
   return  <div key={createCountry.alpha3Code}>
      <p onClick={() => enterToConsole(createCountry.alpha3Code)}>{createCountry.name}</p>
    </div>
  })
  
  return (
    <div className="App">
      {createCountrys}
      <div>qweqwe</div>
    </div>
  );
}

export default App;
