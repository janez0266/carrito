 

//****************      Inicialización de variables y métodos   ***************** */
//const url = "/src/data/items.json"
const url = "https://fakestoreapi.com/products";
const urlTexto = "/src/data/informacion.json";

getAPI(url, "all");     //"all" es un parámetro para mostrar todo los artículos del catálogo
cargarTema();           // carga el tema si se consigue en LocalStorage
informacion(urlTexto);  // Carga un texto y lo muestra al pasar el cursor sobre el logo


//************** Captura de los eventos de activación del menú lateral */
document.querySelector('.menu-btn').addEventListener('click', () => {
  console.log('click...');
  document.querySelector('.nav-menu').classList.toggle('show');
});


/****************************************************************************************************
  * Método que revisa el LocalStorage del navegador para cargar el ultimo tema seleccionado
  * [Aplicación(es) que usa este método: this
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: T
  * @returns   
*/
function cargarTema() {
  if("tema" in localStorage){
    const data = localStorage.getItem('tema');
    document.documentElement.setAttribute('tema', data);
    if (data == "ligth"){
        document.querySelector('#switch input[type="checkbox"]').checked = true;
        document.documentElement.setAttribute('tema', 'light');
    }    
  }
  const colorSwitch = document.querySelector('#switch input[type="checkbox"]');
  colorSwitch.addEventListener('change', cambiaTema);
}

/****************************************************************************************************
  * Método que cambia el tema al seleccionarlo en un Toggle Button. se guarda en el LocalStorage
  * [Aplicación(es) que usa este método: 
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Evento del Toggle Button
  * @returns   Activar tema seleccionado
*/
function cambiaTema(ev){
    if(ev.target.checked){
        document.documentElement.setAttribute('tema', 'light');
        localStorage.setItem('tema', 'ligth');

    } else {
        document.documentElement.setAttribute('tema', 'dark');
        localStorage.setItem('tema', 'dark');

    }
}
            



/****************************************************************************************************
  * Método que carga un texto de un archivo JSON ubicado en src/data/ 
  * [Aplicación(es) que usa este método: 
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: URL del archivo a leer
  * @returns   Texto que se muestra al pasar el cursor sobre el logo
*/
function informacion(urlTexto) {
  fetch (urlTexto)
    .then(response =>response.json())
    .then(dataText => {
        const myleni = dataText[0].title;           //Llena el arreglo 'articulos' con los datos descargados
        document.getElementById("textoLeni").title = myleni; 
    })
    .catch(error => console.log("error =>", error));
        
}



/****************************************************************************************************
  * Método que muestra una ventana popup con mensajes definidos
  * [Aplicación(es) que usa este método: index.html, cart.js, newStock,js, 
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Texto: Mensaje a mostrar en el popup
  * @returns   Texto con mensaje en: <div class="popup" id="popup"> ubicado en index.html
*/
function popup(text) {
    document.getElementById("popup").innerHTML = "<div class='popupText'><h3>" + text + "</h3></div>";
    document.getElementById("popup").style.height = "100px";
    setTimeout(function(){ 
    document.getElementById("popup").style.height = "0";
  }, 3000);

}
//***************************************************************************************************** */


