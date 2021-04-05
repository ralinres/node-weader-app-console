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

  async buscarCiudad(lugar = ''){
     
    try {
        
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapbox,
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        })
        
       const response = await instance.get()

       console.log(response.data);

        return []; //lugares resultado de busqueda

    } catch (error) {
        
        return []

    }


  }


}



module.exports = Busquedas;