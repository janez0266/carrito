

// mostrar los articulos en el catalogo al iniciar index.html

mostrarArticulos();


//agregar articulos nuevos dede la plantilla html

function agregar_articulo() {
    let idNumber = articulos.length + 1;
    const newTitulo = document.getElementById("titulo").value;
    const newespecificaciones = document.getElementById("especificaciones").value;
    const newPrecio = document.getElementById("precio").value; 
    const newImg = document.getElementById("imagen").textContent;
    if (newTitulo === "" || newespecificaciones === "" || newPrecio === "" || newImg == "") { 
        popup("...Debe llenar todos los campos del formulario.Intente de nuevo..."); 
    } else {  
        let newArticulo = {
            id: idNumber,
            titulo: newTitulo,
            especificaciones: newespecificaciones,
            precio: newPrecio,
            imagen: newImg
        }   
        articulos.push(newArticulo); // agrega registros al principio del arreglo
        mostrarArticulos();
    
        document.getElementById("titulo").value = "";
        document.getElementById("especificaciones").value = "";
        document.getElementById("precio").value = ""; 
        document.getElementById("imagen").textContent = "";
        document.getElementById("div1").textContent = "";
        popup("El artículo se ha registrado correctamente...");
    }
}



//agregar al carrito

var articuloCarrito = []; //arreglo del carrito

function carrito(idx) {
    
    if (articuloCarrito.length === 6){
        window.alert("El máximo de productos que se pueden comprar es 6...")
    }else {
 
        let articuloCarritoTemp = {
         id: articulos[idx - 1].id,
         titulo: articulos[idx - 1].titulo,
         especificaciones: articulos[idx - 1].especificaciones,
         precio: articulos[idx - 1].precio,
         imagen: articulos[idx - 1].imagen
        }
        articuloCarrito.push(articuloCarritoTemp);     //agrega el articulo al array articuloCarrito

        // mostrar los productos en el carrito
        var articleCarrito = articuloCarrito.map(function(bar){  //arreglo temporal para montar los articulos
         return ' \
            <hr><br>  \
             <p id="titulo"  class="font-size: 10px">'+bar.titulo+'</p> \
            <p>Precio: $<span id="precio">'+bar.precio+'</span></p> '
            
        })

        //var montoTotal = articuloCarrito.map((bar) => monto += Number(bar.precio));  //calcula el subtotal a medida que se agregan articulos al carrito
        var monto = montoR();
        document.getElementById("muestraCarrito").innerHTML = articleCarrito;  // muestra el listado del contenido del carrito
        document.getElementById("counter").innerHTML = articleCarrito.length;   // muestra el contador del carrito
        document.getElementById("total").innerHTML = "<br><hr><br><b style='color: Red;'>Total: " + monto + "</b><br>";     //muestra el monto total
        document.getElementById("btnVaciar").innerHTML = '<h2 onclick="vaciar()">Vaciar</h2> ';
        document.getElementById("btnComprar").innerHTML = '<h2 onclick="comprar()">Comprar</h2> ';

        //console.log("articulos del carrito: " + articuloCarrito.length)   

    }
}


//   Ver el monto facturado
function montoR(){
    let montoe = 0;
    // var montoTotal = articuloCarrito.map(function(bar){
    // return monto = monto + Number(bar.precio);
    // })
    var articleCarrito = articuloCarrito.map((bar) => montoe += Number(bar.precio));
    return montoe;
}



/****************************************************************************************************
  * Método que elimina los articulos seleccionados en el carrito
  * [Aplicación(es) que usa este método: index.html: <aside>]
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: ninguno
  * @returns {Array}  Listado de articulos en: <div class="contenedor" id="article"> ubicado en index.html
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
    popup("Los articulos del carrito fueron eliminados con éxito...");
}
//***************************************************************************************************


   

/****************************************************************************************************
  * Método que selecciona una imagen para representar al nuevo articulo del catálogo
  * [Aplicación(es) que usa este método: index.html: 
  *         <form class="formulario" >  
  *             <p id="imagen" name="imagen">
  *             <div id="div1" >]
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Texto: ubicación de la imagen seleccionada
  * @returns {Array}  /ruta/imagen.seleccionada 
*/

function addImg(text) {
    
    document.getElementById("div1").innerHTML = '<img id="drag" src="' + text + '"></img>'
    document.getElementById("imagen").innerHTML = text;
}
//***************************************************************************************************




/****************************************************************************************************
  * Método que toma los articulos agregados al carrito para procesar su compra
  * [Aplicación(es) que usa este método: <div id="comprar" class="comprar"> en index.html
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Texto: ubicación de la imagen seleccionada
  * @returns {Array}  /ruta/imagen.seleccionada 
*/
//*****************************  comprar  +++++++++++++++++++++++++++ */
function comprar() {

    //document.getElementById("btnCar").style.display = "none";
    var monto = montoR();
    let menuVenta = '\
        <div class="menuVenta"> \
            <div><button class="openbtn" onclick="vaciar()">Vaciar carrito</button> </div> \
            <div><button class="openbtn" onclick="cerrarVentana()">Cerrar</button> </div> \
            <div><button class="openbtn" onclick="ejecutarVenta()">Finalizar la compra</button> </div> \
        </div> \
        <div class="info"> \
            <div> <p>Cantidad de artículos: ' + articuloCarrito.length + '</p> \
            <div><p>Monto a pagar: $ ' + monto + '</p></div>   \
        </div><hr>'
    document.getElementById("comprar").style.display = "block";
    console.log("articulos del carrito: " + articuloCarrito.length) 
    console.log(articuloCarrito) 
    //var monto = montoR();
    if (monto == 0){
        window.alert("No tiene ningun articulo en el carrito...");
    } else {
        // mostrar los productos en el carrito
        var articleCarrito = articuloCarrito.map(function(bar){  //arreglo temporal para montar los articulos
            return ' \
                <div class="caja2">  \
                    <img src="'+bar.imagen+'" >  \
                    <div>        \
                        <h3>'+bar.titulo+'</h3> \
                        <p> '+bar.especificaciones+'</p> \
                        <p>Precio: $<span id="precioL">'+bar.precio+'</span></p> \
                    </div>      \
                </div> '
       
        })
        var monto = montoR();
        document.getElementById("comprar").innerHTML = menuVenta + articleCarrito;  // muestra el listado del contenido del carrito
    }
}
//*******************************************************************************************+ */



function cerrarVentana(){
    document.getElementById("comprar").style.display = "none";
}

function ejecutarVenta() {
     //window.alert("Total a cancelar: $" + montoR());
    vaciar();
    cerrarVentana()
    popup("Operacion exitosa, su compra se ha realizado...");
}



/****************************************************************************************************
  * Método que muestra una ventana popup con mensajes definidos
  * [Aplicación(es) que usa este método: index.html]
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