const axios = require('axios')
require('dotenv').config()




class Busquedas{
 
  historial = ['Madrid','Japon']

  constructor(){
     
    //TODO: leer de bd si existe

  }

  get paramsMapbox(){
        
     return {
        'access_token' : process.env.MAPBOX_KEY,
        'limit':5,
        'language':'es'
    }

  }

   get paramsOpenWeatherMap(){
    
    return {
      'appid' : process.env.OPEN_W_MAP_KEY,
      'units' : 'metric',
      'lang'  :'es'
  }

  }

  async getWeatherByLatLng( lat ='',lon='' ){
     
    try {
       
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenWeatherMap,lat,lon},
        timeout: 1000,           
    })
    
   const response = await instance.get()
    
   const {main , weather} = response.data;
   
   return { 
          desc: weather[0].description,
          min:  main.temp_min, 
          max:  main.temp_max,
          temp:main.temp
        };


    } catch (error) {

      return []
      
    }

  }

  async buscarCiudad(lugar = ''){
     
    try {
        
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapbox,
            timeout: 1000,           
        })
        
       const response = await instance.get()

       return response.data.features.map( item =>({
         
         id:  item.id,
         name:item.place_name,
         lng: item.center[0],
         lat: item.center[1],

       }));

      
    } catch (error) {
        
        return []

    }


  }


}



module.exports = Busquedas;