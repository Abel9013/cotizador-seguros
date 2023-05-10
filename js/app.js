// constructores 
function Seguro (marca, year, tipo){
  this.marca = marca,
  this.year = year,
  this.tipo = tipo
}
function UI (){

}
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
// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', ( )=>{
  ui.llenarOpciones() //Lena el select con los años
} )

addEventListener()
function addEventListener(){
  const formulario = document.querySelector("#cotizar-seguro")
  formulario.addEventListener('submit', cotizarSeguro)
}
function cotizarSeguro (e) {
  e.preventDefault()
  // Leer marca seleccionada
  const marca = document.querySelector("#marca").value
  console.log(marca);
  // Leer año seleccionada
  const year = document.querySelector("#year").value
  // Leer tipo seleccionada
  const tipo = document.querySelector('input[name="tipo"]:checked').value
  console.log(tipo);
  if( marca === '' || year=== '' || tipo === ''){
    console.log("no paso la validacion")
  }
}