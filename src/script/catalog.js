/*******************   catalogo.js   **************************/ 


var articulos = [];  // Arreglo donde se almacena la data del catálogo del producto
var stock = [];


/***************************************************************************************************************
  * Método que descarga los datos de una API externa
  * [Aplicación(es) que usa este método: main.js
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: url 
  * @returns {Array}  articulos(array) del catalogo
***************************************************************************************************************** */
function getAPI(urlCall) {
    fetch (urlCall)
    .then(response =>response.json())
    .then(data => {
        articulos = data;           //Llena el arreglo 'articulos' con los datos descargados
        llenarStockCount(data);     //Crea un arreglo para llevar el conteo de stock disponible
        mostrarArticulos();        
    })
    .catch(error => console.log("error =>", error)); 
       
}




/*****************************************************************************************************************
  * Método que lee los datos del arreglo (articulos) del catálogo de productos y los muestra en la pagina ppal.
  * [Aplicación(es) que usa este método: NewStock.js, catalog.js, cart.js
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Ninguno (toma los valores del arreglo global "articulos")
  * @returns {Array}  Listado de articulos en: <div class="contenedor" id="article"> ubicado en index.html
  * *****************************************************************************************************************/
function mostrarArticulos() {    
    //console.log(articulos);
    //console.log(stock);
    var articleNew = articulos.map(function(bar){
        var cantidadDisponible = buscarStock(bar.id)     //Busca el stock diaponible de cada artículo
        //console.log(cantidadDisponible);
        return ' \
            <div class="caja">  \
                <div class="cajaImg">     \
                <abbr title="' + bar.description + '"><img src="'+bar.image+'" ></abbr>  \
                </div>   \
                <div class="arText">        \
                    <h3 id="tituloL">'+bar.title+'</h3> \
                    <p id="especificacionesL"> '+bar.category+'</p> \
                    <p> Disponibles: ' + cantidadDisponible +'</p> \
                    <p>Solo por: $<span id="precio">'+bar.price+'</span></p> \
                </div>      \
                <div class="cajaBtn">    \
                    <img class="btnCar" src="./img/add-to-cart-1747164_960_720.png" onclick="carrito('+bar.id+')"> \
                </div> \
            </div> '
        })
        document.getElementById("article").innerHTML = articleNew;        
}


/*****************************************************************************************************************
  * Método que crea un arreglo para llevar el stock de cada artículo disponivle
  * [Aplicación(es) que usa este método: catalog.js: getAPI()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: recibe el arreglo de artículos
  * @returns {Array}  Crea un arreglo de inicialización de stock para cada artículo
  * *****************************************************************************************************************/
function llenarStockCount(articulosStock) {
    //console.log(articulosStock);
    articulosStock.forEach(function(item) { 
        
        let stockCantidad = {
            id: item.id,
            disponible: 20
        }   
        stock.push(stockCantidad);         
    })
}



/*****************************************************************************************************************
  * Método que lee los datos del arreglo (articulos) del catálogo de productos y los muestra en la pagina ppal.
  * [Aplicación(es) que usa este método: catalog.js: mostrarArticulos(), cart.js: detalles()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Indice del articulo (id:)
  * @returns {Array}  Cantidad de artículos disponibles
  * *****************************************************************************************************************/
function buscarStock(idx) {
    let result = stock.filter(item => item.id == idx);
    return result[0].disponible;
}

