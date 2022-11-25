import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import Info from './components/Info/Info';

interface Country {
  name: string;
  alpha3Code: string;
}

function App() {
  const UrlWithName = 'https://restcountries.com/v2/all?fields=alpha3Code,name'
  const UrlWithcode = 'https://restcountries.com/v2/alpha/'

  const [name, setName] = useState<Country[]>([]);

  const [nameBorders, setNameBorders] = useState<string[]>(['Chouse the country']);



  useEffect(() => {
    const setCountry = async () => {
      const responseArr = await axios.get<Country[]>(UrlWithName);

      const promises = responseArr.data.map(async country => {
        setName(prev => [...prev, country])
      });
    };

    setCountry();
  }, []);


  const enterBorders = async (code: string) => {
    setNameBorders([])
    const responseCode = await axios.get(UrlWithcode + code);

    const borders = responseCode.data.borders;

    if (borders !== undefined) {
      for (let i = 0; i < borders.length; i++) {
        const countryBorders = await axios.get(UrlWithcode + borders[i]);
        setNameBorders(prev => [...prev, countryBorders.data.name]);
      }
    } else {
      setNameBorders(['This country do not have borders'])
    }
  };

  const createCountrys = name.map(createCountry => {
    return <p key={createCountry.alpha3Code} onClick={() => enterBorders(createCountry.alpha3Code)}>{createCountry.name}</p>
  });

  const createBorders = nameBorders.map(nameBorder => {
    return <li key={Math.random()}>{nameBorder}</li>
  })


  return (
    <div className="App">
      <div>
        {createCountrys}
      </div>
      <div>
        <Info>{createBorders}</Info>
      </div>
    </div>)
};

export default App;
