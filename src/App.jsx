import React, { useEffect, useState } from 'react';
import axios from "axios"

const App = () => {
  const [input, setInput]=useState("")
  const [weather,setWeather]=useState()
  const [submitted,setSubmitted] = useState(false)

  // Assuming these are dynamic data placeholders
  const api_key="fe67935db51650202938defcb1fbf79e"
  const baseURL=`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`
  useEffect(()=>{
    fetchData()
  },[])
  
  const fetchData=async()=>{
    try{
      const data=await axios.get(baseURL)
      console.log(data.data)
      setWeather(data.data)
      setSubmitted(true)
    }

    catch(error){
      console.log("Error wile fetching the data", error)
    };
  }
  
  function format(time){
    const date= new Date(time*1000)
    const options={
      hour:'numeric',
      minute:'numeric'
    }
    return date.toLocaleTimeString([],options)
  }


  return (
    <div className="max-w-md mx-auto mt-8 rounded-lg overflow-hidden shadow-lg bg-gray-100">
      {/* Search Box */}
      <div className="flex items-center bg-white border-b border-gray-200 p-2">
        <input
          type="text"
          className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter City Name"
          onChange={(e)=>setInput(e.target.value)}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchData}>
          Submit
        </button>
      </div>
      {/* Weather Details Card */}
      {weather  && (
      <div className="p-4">
        <div className="text-gray-800 font-bold text-xl mb-2">Weather Details</div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <p className="mb-4"><span className="font-bold">Coordinates:</span> Latitude={weather?.coord?.lat}, Longitude={weather?.coord?.lon}</p>
          <p className="mb-2"><span className="font-bold">Temperature:</span>{Math.round(weather?.main?.temp -273)}°C</p>
          <p className="mb-2"><span className="font-bold">Pressure:</span> {weather?.main?.pressure}amp</p>
          <p className="mb-2"><span className="font-bold">Humidity:</span> {weather?.main?.humidity}%</p>

          <div className="flex justify-between">
            <p className="mb-2"><span className="font-bold">Wind Speed:</span> {weather?.wind?.speed}km/h</p>
            <p className="mb-2"><span className="font-bold">Sunrise:</span> {format(weather?.sys?.sunrise)}</p>
            <p className="mb-2"><span className="font-bold">Sunset:</span> {format(weather?.sys?.sunset)}</p>
          </div>
        </div>
      </div>)}
    </div>
    )
  }

export default App;