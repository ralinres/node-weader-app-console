const inquirer = require('inquirer')
require('colors')

const questions = [
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices:[
            {
                value:'1',
                name:`${'1'.green}. Buscar Ciudad`
            },{
                value:'2',
                name:`${'2'.green}. Historial`
            },{
                value:'0',
                name:`${'0'.green}. Salir`
            },
         
        ] 
    }
]


const inquirerMenu = async() => {
  
    console.clear()
    console.log('==========================='.green);
    console.log('Seleccione una opción'.blue);
    console.log('===========================\n'.green);
  
   const {opcion} =  await inquirer.prompt(questions)
   
   return opcion

}

const pausa = async() =>{
    
    console.log('\n');
    await inquirer.prompt([
       {
            type : 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`
       }
    ])

} 

const listadoTareaBorrar = async ( tareas = [] ) =>{
     
    // {
    //     value:tarea.id,
    //     name:`${'5'.green}. Completar tarea(s)`
    // }
    
     const choices = tareas.map((tarea,index ) => {
          
        let idx = `${index + 1}`.green
         
            return {
            value:tarea.id,
            name:`${idx}. ${tarea.desc}`
            }
     })

     choices.unshift({
         value : '0',
         name: '0.'.green + ' Cancelar'
     })
    
     const questions = [
         {
             type:'list',
             name:'id',
             message:'Borrar',
             choices
         }
     ]

     const {id} =  await inquirer.prompt(questions)

     return id;


}

const listadoTareaCompletar = async ( tareas = [] ) =>{
     
     
     const choices = tareas.map((tarea,index ) => {
          
        let idx = `${index + 1}`.green
         
            return {
             value:tarea.id,
             name:`${idx}. ${tarea.desc}`,
             checked: tarea.completadoEn ? true : false
            }
     })
    
     const questions = [
         {
             type:'checkbox',
             name:'ids',
             message:'Completar',
             choices
         }
     ]

     const {ids} =  await inquirer.prompt(questions)

     return ids;


}

const confirmacion = async (message) =>{
   
     const questions = [
      
         {
             type:'confirm',
             name:'ok',
             message
         }  

     ]

     const {ok} =  await inquirer.prompt(questions)

     return ok


}

const leerInput = async(mensaje = '') =>{
    
  const {read} =  await inquirer.prompt([
       {
            type : 'input',
            name: 'read',
            message: mensaje,
            validate(value){
               if( value.length == 0 ){
                   return "Por favor ingrese un valor"
               }else{
                   return true
               }
            }
       }
    ])

   return read 

}


module.exports = {
 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmacion,
    listadoTareaCompletar
}