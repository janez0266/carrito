
//agregar al carrito

var articuloCarrito = []; //arreglo del carrito


/***************************************************************************************************************
  * Métodos que agrega en un arreglo(carrito) los artículos que se van seleccionando del catálogo
  * [Aplicación(es) que usa este método: catalog.js
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: ID del artículo
  * @returns {Array}  Muestra en pantalla un resumen de los articulos seleccionados
***************************************************************************************************************** */
function carrito(idx) {

    //verificar si el articulo ya ha sido seleccionado

    let exist;
    articuloCarrito.forEach( function(product) {
        if (product.id == idx) {
            exist = true;                   
        } 
    } )
    if(exist){
        popup("Ya elegiste este artículo"); 
    }else{
    //agregar el articulo al carrito
    let articuloCarritoTemp = {
        id: articulos[idx - 1].id,
        title: articulos[idx - 1].title,
        description: articulos[idx-1].description,
        category: articulos[idx - 1].category,
        price: articulos[idx - 1].price,
        image: articulos[idx - 1].image
    }
    articuloCarrito.push(articuloCarritoTemp);     //agrega el articulo al array articuloCarrito
    // mostrar los productos en el carrito
    mostrarResumenCarrito();
    }
}



 
/****************************************************************************************************
  * Método que muestran los detalles de cada articulo del carrito para proceder a la compra
  * [Aplicación(es) que usa este método: cart.js: mostrarResumenCarrito()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Texto: ubicación de la imagen seleccionada
  * @returns {Array}  /ruta/imagen.seleccionada 
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function detalles() {

    var monto = montoAcumulado();
    let menuVenta = '\
        <div class = "franjaSuperior">   \
          <div class="menuVenta"> \
            <div><button class="openbtn" onclick="ejecutarVenta()">Finalizar la compra</button> </div> \
            <div><button class="openbtn" onclick="vaciar()">Vaciar carrito</button> </div> \
            <div><button class="openbtn" onclick="cerrarVentana()">Cerrar</button> </div> \
          </div> \
          <div class="info"> \
            <div> <p>Cantidad de artículos: ' + articuloCarrito.length + '</p> </div>\
            <div><p>Monto a pagar: $ <span id="precio">' + monto.toFixed(2) + '</span></p></div>   \
          </div>    \
        </div> '
    document.getElementById("comprar").style.display = "block";
    document.getElementById("superior").style.display = "block";
    document.getElementById("superior").innerHTML = menuVenta;
    if (monto == 0){
        cerrarVentana();
        popup("No tiene articulos en el carrito....");        
    } else {
        // mostrar los productos en el carrito
        var articleCarrito = articuloCarrito.map(function(bar){  //arreglo temporal para montar los articulos
            var cantidadDisponible = buscarStock(bar.id)
            return ' \
                <div class="caja2">  \
                <div class="caja2Img">     \
                    <abbr title="' + bar.description + '"><img src="'+bar.image+'" ></abbr>  \
                </div> \
                <div>        \
                        <h3>'+bar.title+'</h3> \
                        <p> '+bar.category+'</p> \
                        <p> Disponibles: ' + cantidadDisponible +'</p> \
                        <p>Precio: $<span id="precio">'+bar.price+'</span></p> \
                    </div>      \
                    <div><button class="openbtn" onclick="quitarArtCart('+bar.id+')">Quitar Articulo</button> </div> \
                </div> '       
        })
        var monto = montoAcumulado();
        document.getElementById("comprar").innerHTML = articleCarrito;  // muestra el listado del contenido del carrito
    }
}



/****************************************************************************************************
  * Método que muestra un resumen de los artículos del carrito
  * [Aplicación(es) que usa este método: cart.js: carrito(), quitarArtCart()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Ninguno
  * @returns {Array}  Imprime resumen del listado actual 
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function mostrarResumenCarrito() {
    var articleCarrito = articuloCarrito.map(function(bar){  //arreglo temporal para montar los articulos
        return ' \
            <hr><br>  \
             <p id="titulo"  class="font-size: 10px">'+bar.title+'</p> \
            <p>Precio: $<span id="precio">'+bar.price+'</span></p> '            
        })
    var monto = montoAcumulado();
    document.getElementById("muestraCarrito").innerHTML = articleCarrito;  // muestra el listado del contenido del carrito
    document.getElementById("counter").innerHTML = articleCarrito.length;   // muestra el contador del carrito
    document.getElementById("total").innerHTML = "<br><hr><br><b style='color: Red;'>Total: " + monto.toFixed(2) + "</b><br>";     //muestra el monto total
    document.getElementById("btnVaciar").innerHTML = '<h2 onclick="vaciar()">Vaciar</h2> ';
    document.getElementById("btnComprar").innerHTML = '<h2 onclick="detalles()">Detalles</h2> ';
}


/***************************************************************************************************************
  * Métodos que devuelve el monto acumulado de los articulos del carrito
  * [Aplicación(es) que usa este método: cart.js: carrito(), comprar()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Ninguno
  * @returns {Array}  Muestra en pantalla un resumen de los articulos seleccionados
***************************************************************************************************************** */
function montoAcumulado(){
    let montoTmp = 0;
    // var montoTotal = articuloCarrito.map(function(bar){
    // return monto = monto + Number(bar.precio);
    // })
    var articleCarrito = articuloCarrito.map((bar) => montoTmp += Number(bar.price));
    return montoTmp;
}



/***************************************************************************************************************
  * Métodos que devuelve el monto acumulado de los articulos del carrito
  * [Aplicación(es) que usa este método: cart.js: detalles()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: idx (indice del articulo a quitar del carrito)
  * @returns {Array}  Muestra en pantalla un resumen de los articulos seleccionados
***************************************************************************************************************** */
function quitarArtCart(idx) {
     let indice = articuloCarrito.findIndex(function(index){
        return index.id == idx;
    });
    articuloCarrito.splice(indice,1);
    //console.log(articuloCarrito);
    detalles();
    mostrarResumenCarrito();
}


/****************************************************************************************************
  * Método que elimina todos los articulos seleccionados en el carrito
  * [Aplicación(es) que usa este método: cart.js: carrito(), ejecutarVenta()
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: ninguno
  * @returns {Array}  Listado vacio de articulos en: <aside> ubicado en index.html
*/
function vaciar() {
    articuloCarrito = [];
    articleCarrito = [];
    document.getElementById("muestraCarrito").innerHTML = ""; //limpia el listado
    document.getElementById("total").innerHTML = "";     //limpia el monto total
    document.getElementById("counter").innerHTML = articuloCarrito.length;
    document.getElementById("btnVaciar").innerHTML = '';
    document.getElementById("btnComprar").innerHTML = '';
    cerrarVentana();
    //window.alert("El carrito fue vaciado con éxito...")
    popup("El carrito esta vacio.....");
}




function cerrarVentana(){
    document.getElementById("superior").style.display = "none";
    document.getElementById("comprar").style.display = "none";
}

function ejecutarVenta() {
    let montoFacturado = montoAcumulado();
    //buscar los articulos del catalogo y descontar la cantidad de articulos restantes
    articuloCarrito.forEach(function(product) {        //recorrer cada articulo del carrito      
        let result = stock.filter(item => item.id == product.id);
        result[0].disponible--;       
    })
    mostrarArticulos();
    vaciar();
    cerrarVentana()
    popup("Operacion exitosa, su compra de $ "+ montoFacturado.toFixed(2)+  " se ha realizado...");
}


