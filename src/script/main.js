


// Ubicación del archivo de datos
//const url = "src/data/items.json";
const url = "https://fakestoreapi.com/products";

getAPI(url);      // => catalog.js



/****************************************************************************************************
  * Método que muestra una ventana popup con mensajes definidos
  * [Aplicación(es) que usa este método: index.html, cart.js, newStock,js, ]
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