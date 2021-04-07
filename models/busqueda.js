const axios = require('axios')
const fs = require('fs')
require('dotenv').config()




class Busquedas{
 
  historial = []
  path = './db/database.json'

  constructor(){
     
    this.leerBD()

  }

  get historial(){
    return this.historial
  }

  get historialCapitalizado(){
     return this.historial.map( lugar =>{
          
         let palabras = lugar.split(' ')

        palabras =  palabras.map( p => p[0].toUpperCase() + p.substring(1) );

        return palabras.join(' ')
      
     })
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


  guardarHistorial( lugar = ''){
      
     if(this.historial.includes(lugar.toLocaleLowerCase())) {
       return
     } 
     
     this.historial = this.historial.splice(0,5)

     this.historial.unshift(lugar.toLocaleLowerCase());

     this.guardarDB()

  }

 async guardarDB(){

    const payload = {
 
      historial : this.historial

    }
     
    await fs.writeFileSync(this.path , JSON.stringify(payload))

  }

  leerBD(){
       
       if(fs.existsSync(this.path)){

           const info = fs.readFileSync(this.path,{encoding:'utf-8'})

           this.historial = JSON.parse(info).historial

       }

 
  }


}



module.exports = Busquedas;