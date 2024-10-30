import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";



export default function App() {
  const [countrylist, setcountrylist] = useState({})
  const [statelist , setstatelist] = useState({})
  const [citylist, setcitylist] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    Country.getAllCountries().map((ele) => {
      setcountrylist((prev) => ({
        ...prev,
        [ele.name]: ele.isoCode,
      }));
    });
    
  }, [])
  useEffect(() => {
    setstatelist({})
    State.getStatesOfCountry(countrylist[selectedCountry]).map((ele)=>{
       setstatelist((prev)=>(
        {...prev,[ele.name]:ele.isoCode}
       ))
       
    })
    
    
  }, [selectedCountry])

  
  
  
  return(
    <>
      <select
        className="w-44 outline-2 outline text-black"
        name="selectcountry"
        id="country"
        onChange={(e)=>{
          setSelectedCountry(e.target.value)
        }}
        >
          {
            Object.keys(countrylist).map((ele)=>{
              return <option value={ele} key={ele}>{ele}</option>
            })
          }
         </select>
         <select
          className="w-44 outline-2 outline"
          name="States"
          id="states"
          onChange={(e)=>setSelectedState(e.target.value)}
          >
            {
              Object.keys(statelist).map((ele)=>{
                return <option value={ele} key={ele}>{ele}</option>
              })
            }
          </select>
          <select 
          className="w-44 outline-2 outline"
          name="cities" id="cities">
            {
              City.getCitiesOfState(countrylist[selectedCountry],statelist[selectedState]).map((ele)=>{
                return <option value="cities" key={ele.name}>{ele.name}</option>
              })
            }
          </select>
    </>
  )








  // return (
  //   <div className="App">
  //     <Select
  //       options={Country.getAllCountries()}
  //       getOptionLabel={(options) => {
  //         return options["name"];
  //       }}
  //       getOptionValue={(options) => {
  //         return options["name"];
  //       }}
  //       value={selectedCountry}
  //       onChange={(item) => {
  //         setSelectedCountry(item);
  //         setSelectedState(null)
  //         setSelectedCity(null)
  //       }}
  //     />
  //     <Select
  //       options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
  //       getOptionLabel={(options) => {
  //         return options["name"];
  //       }}
  //       getOptionValue={(options) => {
  //         return options["name"];
  //       }}
  //       value={selectedState}
  //       onChange={(item) => {
  //         setSelectedCity(null)
  //         setSelectedState(item);
  //       }}
  //     />
  //     <Select
  //       options={City.getCitiesOfState(
  //         selectedState?.countryCode,
  //         selectedState?.isoCode
  //       )}
  //       getOptionLabel={(options) => {
  //         return options["name"];
  //       }}
  //       // getOptionValue={(options) => {
  //       //   return options["name"];
  //       // }}
  //       value={selectedCity}
  //       onChange={(item) => {
  //         setSelectedCity(item);
  //       }}
  //     />
  //   </div>
  // );
}
