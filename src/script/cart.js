
//agregar al carrito

var articuloCarrito = []; //arreglo del carrito


/***************************************************************************************************************
  * Métodos que agrega en un arreglo(carrito) cada artículos que se van seleccionando del catálogo
  * [Aplicación(es) que usa este método: catalog.js
  * @author Ing. Julio Añez
  * @param {number} Parametros: ID del artículo, Arreglo global de objetos del carrito
  * @returns {Array}  Muestra en pantalla un resumen de los articulos seleccionados
***************************************************************************************************************** */
function llenarCarrito(idx) {
    //verificar si el articulo ya ha sido seleccionado
    let exist = false;
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
        image: articulos[idx - 1].image,
        cantidad: 1
    }
    articuloCarrito.push(articuloCarritoTemp);     //agrega el articulo al array articuloCarrito    
    mostrarResumenCarrito();        // Actualiza los valores en pantalla
    }
}



 
/****************************************************************************************************
  * Método que muestran los detalles de cada articulo del carrito para proceder a la compra
  * [Aplicación(es) que usa este método: cart.js: mostrarResumenCarrito(), agregarQuitar()
  * @author Ing. Julio Añez
  * @param {ninguno} Parametros: Arreglo global de objetos del carrito
  * @returns {Array}  muestra o refresca la lista detallada de los articulos del carrito 
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function mostrarDetallesCarrito() {
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
            <div><p>Monto a pagar: $ <span id="precio"><b>' + monto.toFixed(2) + '</b></span></p></div>   \
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
                    <p>Precio: $ <span id="precio"><b>'+bar.price+'</b></span></p> \
                    <div class="cantDisp">\
                        <input type="number"  id="nrItems'+bar.id+'" value='+bar.cantidad+' size="3" readonly>\
                        <input type="button"  onclick="agregarQuitar(1, '+bar.id+')" value="+">\
                        <input type="button"  onclick="agregarQuitar(2, '+bar.id+')" value="-">\
                    </div>\
                </div>      \
                <div>\
                    <button class="openbtn" onclick="quitarArtCart('+bar.id+')">Quitar Articulo</button> </div> \
                </div> '       
        })
        var monto = montoAcumulado();
        document.getElementById("comprar").innerHTML = articleCarrito;  // muestra el listado del contenido del carrito
    }
}


/****************************************************************************************************
  * Método que muestra un resumen de los artículos del carrito al pasar el cursor sobre la imagen
  * [Aplicación(es) que usa este método: cart.js: carrito(), quitarArtCart()
  * @author Ing. Julio Añez
  * @param {Array} Parametros: Arreglo global de objetos del carrito
  * @returns {Array}  Imprime resumen del listado actual del carrito 
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function mostrarResumenCarrito() {
    let monto = montoAcumulado().toFixed(2)
    document.getElementById("counter").innerHTML = articuloCarrito.length;   // muestra el contador del carrito
    document.getElementById("total").innerHTML = "<br><hr><br><b style='color: Red;'>Total: $ " + monto + "</b><br>";     //muestra el monto total
    document.getElementById("btnVaciar").innerHTML = '<h2 onclick="vaciar()">Vaciar</h2> ';
    document.getElementById("btnComprar").innerHTML = '<h2 onclick="mostrarDetallesCarrito()">Detalles</h2> ';
}


/***************************************************************************************************************
  * Métodos que devuelve el monto acumulado de los articulos del carrito
  * [Aplicación(es) que usa este método: cart.js: mostrarDetalleCarrito(), mostrrResumenCarrito(), ejecutarVenta()
  * @author Ing. Julio Añez
  * @param {Ninguno} Parametros: Ninguno
  * @returns {Number}  Regrea el monto acumulado de los artículos que se van agregando al carrito
***************************************************************************************************************** */
function montoAcumulado(){
    let montoTmp = 0;
    var articleCarrito = articuloCarrito.map((bar) => montoTmp += Number(bar.price * bar.cantidad));
    return montoTmp;
}



/***************************************************************************************************************
  * Métodos que Elimina un artículodel carrito
  * [Aplicación(es) que usa este método: cart.js: mostrarDetallesCarrito()
  * @author Ing. Julio Añez
  * @param {number} Parametros: idx (indice del articulo a quitar del carrito)
  * @returns {Array}  Elimina un artículodel carrito y refresca los listados
***************************************************************************************************************** */
function quitarArtCart(idx) {
     let indice = articuloCarrito.findIndex(function(index){
        return index.id == idx;
    });
    articuloCarrito.splice(indice,1);
    mostrarDetallesCarrito();
    mostrarResumenCarrito();
}


/****************************************************************************************************
  * Método que elimina todos los articulos del carrito
  * [Aplicación(es) que usa este método: cart.js: mostrarDetalleCarrito(), mostrarResumenCarrito(), ejecutarVenta()
  * @author Ing. Julio Añez
  * @param {Ninguno} Parametros: ninguno
  * @returns {Array}  Listado vacio de articulos en: <aside> ubicado en index.html
*/
function vaciar() {
    articuloCarrito = [];
    articleCarrito = [];
    document.getElementById("muestraCarrito").innerHTML = ""; //limpia el listado
    document.getElementById("total").innerHTML = "";     //limpia el monto total 
    document.getElementById("counter").innerHTML = articuloCarrito.length;   // muestra el contador del carrito
    document.getElementById("total").innerHTML = "";     //muestra el monto total
    document.getElementById("btnVaciar").innerHTML = "";
    document.getElementById("btnComprar").innerHTML = "";
    cerrarVentana();
    popup("El carrito fue vaciado....");

}



/****************************************************************************************************
  * Método que cierra la ventana del carrito
  * [Aplicación(es) que usa este método: cart.js: ejecutarVenta(), vaciar()
  * @author Ing. Julio Añez
  * @param {Ninguno} Parametros: ninguno
  * @returns {ninguno}  
*/
function cerrarVentana(){
    document.getElementById("superior").style.display = "none";
    document.getElementById("comprar").style.display = "none";
}


/****************************************************************************************************
  * Método que toma los articulos del carrito y efectúa la venta
  * [Aplicación(es) que usa este método: cart.js: ejecutarVenta(), vaciar()
  * @author Ing. Julio Añez
  * @param {Ninguno} Parametros: ninguno
  * @returns {Array}  
*/
function ejecutarVenta() {
    let montoFacturado = montoAcumulado();
    //buscar los articulos del catalogo y descontar la cantidad de articulos restantes
    articuloCarrito.forEach(function(product) {        //recorrer cada articulo del carrito 
        const idArt = product.id;
        const elemento = "nrItems" + idArt; 
        let result = stock.filter(item => item.id == product.id);
        const nrItems = document.getElementById(elemento).value;
        result[0].disponible -= nrItems ; 
    })
    dataCat = document.getElementById("filtroCat").value;
    mostrarArticulos(dataCat);                          // refresca la vista de los artículos del catálogo
    vaciar();
    cerrarVentana()
    popup("Operacion exitosa, su compra de $ "+ montoFacturado.toFixed(2)+  " se ha realizado...");
}


/****************************************************************************************************
  * Método que aumenta o disminuye la cantidad a comprar de cada artículo del carrito
  * [Aplicación(es) que usa este método: cart.js: mostrarDetalleCarrito()
  * @author Ing. Julio Añez
  * @param {number|number} Parametros: "operador": '1' si es suma, '2' si es resta; "idx": indice del artículo
  * @returns {Array}  
*/
function agregarQuitar(operador,idx){
    const elemento = "nrItems" + idx;       //crea el nombre "id" que sera usado en el "input" de cantidad
    let indice = articuloCarrito.findIndex(indiceCarrito => indiceCarrito.id === idx);
    let cantidadEnStock = stock[idx-1].disponible;
    let cantidadAComprar = articuloCarrito[indice].cantidad
   
    if(operador == 1){
        if(cantidadAComprar != cantidadEnStock) articuloCarrito[indice].cantidad += 1;
    }else {
        if (cantidadAComprar  > 1) articuloCarrito[indice].cantidad -= 1;
    }
    document.getElementById(elemento).value = articuloCarrito[indice].cantidad; 
    mostrarDetallesCarrito();
    mostrarResumenCarrito();

}