const { leerInput, inquirerMenu, pausa ,listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");



const main = async () =>{
  
    const busqueda = new Busquedas()
    let opt = ''
  
     do {
         
        opt = await inquirerMenu();

       switch (opt) {
           case '1':
             const lugar     = await leerInput('¿Qué cuidad desea buscar.?')
             const lugares   = await busqueda.buscarCiudad(lugar)
             const select_id = await listadoLugares(lugares)

             const select_obj = lugares.find( item => item.id === select_id );

            //Clima
            const clima = await busqueda.getWeatherByLatLng(select_obj.lat,select_obj.lng);
           
            //Mostrar resultados
            console.clear()
            console.log('\nInformación de ciudad\n'.green);
            console.log('Ciudad:', select_obj.name);
            console.log('Lat:',select_obj.lat);
            console.log('Lng:',select_obj.lng);
            console.log('Tiempo:',clima.desc.green);
            console.log('Temperatura:',clima.temp);
            console.log('Mínima:',clima.min);
            console.log('Máxima:',clima.max);          
             
            break;
           case '2':
               console.log('Opcion', opt );
               break;
           
       }
       
       await pausa()
        

     } while (opt != '0');
     

}




main()