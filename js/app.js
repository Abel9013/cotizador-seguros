const formulario = document.querySelector("#cotizar-seguro")
// constructores 
function Seguro (marca, year, tipo){
  this.marca = marca,
  this.year = year,
  this.tipo = tipo
}
// Realiza cotizacion con los datos 
Seguro.prototype.cotizarSeguro = function(){
  /*
     1= Americano 1.15
     2= Asiatico 1.05
     3= Europeo 1.35
  */ 
 let cantidad;
 const base = 2000;
  switch (this.marca) {
    case "1":  
      cantidad = base * 1.15
      break;
    case "2":  
      cantidad = base * 1.05
      break;
    case "3":  
      cantidad = base * 1.35
      break;
    default:
      break;
  }
  // leer año
  const diferencia = (new Date().getFullYear()) - this.year
  // Cada año el costo reduce 3% el valor del seguro
  cantidad -= ((diferencia*3) * cantidad )/100
  /*
    seguro basico = 30% más
    seguro completo = 50% más
  
  */ 
  if(this.tipo === 'basico'){
    cantidad *= 1.30;
  }else {
    cantidad *= 1.50
  }
  return cantidad
}
function UI (){}
// Llena las opciones de los años
UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
          min = max - 20;
    const selectYear = document.querySelector("#year")
    for(let i=max; i > min; i-- ) {
      let option = document.createElement('option')
      option.value = i; 
      option.textContent = i;
      selectYear.appendChild(option)
    }
}   
// Muestra alertas en pantallas
UI.prototype.muestraAlertas = function(mensaje, tipo){
    // limpiarHTML()
    // const formulario = document.querySelector("#cotizar-seguro")
    const div = document.createElement("div") 
    if(tipo==="error"){
      div.classList.add("error")
    }else {
      div.classList.add('correcto')
    }
    div.classList.add("mensaje", "mt-10")
    div.textContent = mensaje
    // Finalmente incerto en el HTML
    formulario.insertBefore( div, document.querySelector("#resultado") )
    setTimeout(()=>{
      div.remove()
    },3000 )
}
UI.prototype.mostrarResultado = (seguro, total)=>{
  const {marca, year, tipo} = seguro
  switch(marca) {
    case "1":
      textoMarca= 'Americano'
      break
    case "2" :
      textoMarca= 'Asiatico'
      break
    case "3" :
      textoMarca= 'Europeo'
      break
      }
  // crear el resultado
  const div = document.createElement('div')
  div.classList.add('mt-10')
  div.innerHTML = `
    <p class="header">Tu resumen</p>
    <p class="font-bold">Total:<span class="font-normal">${textoMarca}</span> </p>
    <p class="font-bold">Total:<span class="font-normal">${year}</span> </p>
    <p class="font-bold">Total:<span class="font-normal capitalize">${tipo}</span> </p>
    <p class="font-bold">Total:<span class="font-normal">$${total}</span> </p>
  `;
  const resultadoDiv = document.querySelector("#resultado")
  // Mostrar spiner 
  const spinner = document.querySelector("#cargando")
  spinner.style.display = "block"
  setTimeout(()=>{
    spinner.style.display = 'none' // Desaparece el spinner, luego se muestra el resultado
    resultadoDiv.appendChild(div)
    },3000 )
}  
// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', ( )=>{
  ui.llenarOpciones() //Lena el select con los años
} )

addEventListener()
function addEventListener(){
  // const formulario = document.querySelector("#cotizar-seguro")
  formulario.addEventListener('submit', cotizarSeguro)
}
function cotizarSeguro (e) {
  e.preventDefault()
  // Leer marca seleccionada
  const marca = document.querySelector("#marca").value
  // Leer año seleccionada
  const year = document.querySelector("#year").value
  // Leer tipo seleccionada
  const tipo = document.querySelector('input[name="tipo"]:checked').value
  if( marca === '' || year=== '' || tipo === ''){
    ui.muestraAlertas("todos los campos son obligatorios", "error")
    return;
  }
  ui.muestraAlertas("Cotizando . . .", "exito")
  // Ocultar cotizaciones previas
  const resultados = document.querySelector("resultado div")
  if(resultados != null){
    resultados.remove()
  }
  // Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo)
  const total = seguro.cotizarSeguro()
  // Utilizar el prototype que va a cotizar 
  ui.mostrarResultado(seguro, total)
}
// function limpiarHTML ( ) {
//   while(formulario.firstChild){
//     formulario.removeChild(formulario.firstChild)
//   }
// }