const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");



const main = async () =>{
  
    const busqueda = new Busquedas()
    let opt = ''
  
     do {
         
        opt = await inquirerMenu();

       switch (opt) {
           case '1':
             const lugar = await leerInput('¿Qué cuidad desea buscar.?')
             await busqueda.buscarCiudad(lugar)
            //buscar lugar

            //Seleccionar lugar

            //Clima

            //Mostrar resultados
            console.log('\nInformación de ciudad\n'.green);
            console.log('Ciudad:',);
            console.log('Lat:',);
            console.log('Lng:',);
            console.log('Temperatura:',);
            console.log('Mínima:',);
            console.log('Máxima:',);          
             
            break;
           case '2':
               console.log('Opcion', opt );
               break;
           
       }
       
       await pausa()
        

     } while (opt != '0');
     

}




main()