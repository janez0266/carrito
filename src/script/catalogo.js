


//catalogo inicial: llenado de un arreglo de forma manual de los articulos del catálogo...

let articulos = [
    {
        id: 1,
        titulo: "TV Sony 42",
        especificaciones: "42 pulgadas smart tv control remoto",
        precio: 500,
        imagen: "./img-catalog/tv-sony.jpg"
    },
    {
        id:2,
        titulo: "Teléfono Android X5",
        especificaciones: "3gb ram, 6.8'",
        precio: 250,
        imagen: "./img-catalog/celulares.jpeg"
    },
    {
        id:3,
        titulo: "Laptop Gamer DELL",
        especificaciones: "14', 16gb ram, teclado iluminado",
        precio: 590,
        imagen: "./img-catalog/laptops.jpg"
    },
    {
        id:4,
        titulo: "Monitor Curvo SAMSUNG",
        especificaciones: "60'1080p, OLED",
        precio: 900,
        imagen: "./img-catalog/monitor-large.jpg"
    },
    {
        id:5,
        titulo: "Audifonos GAMERS",
        especificaciones: "Sonido Surround",
        precio: 145,
        imagen: "./img-catalog/audifonos.jpg"
    },
    {
        id:6,
        titulo: "Disco Duro Externo",
        especificaciones: "SSD, Usb 3.1, 1TB",
        precio: 150,
        imagen: "./img-catalog/disco-ext.jpg"
    },
    {
        id:7,
        titulo: "Monitor 19",
        especificaciones: "Para PC, LED HDMI",
        precio: 150,
        imagen: "./img-catalog/monitor.jpg"
    },
    {
        id:8,
        titulo: "Pendrive 128GB",
        especificaciones: "Usb3 de alta velocidad",
        precio: 40,
        imagen: "./img-catalog/pendrive.png"
    },
    {
        id:9,
        titulo: "Teclado Retroiluminado",
        especificaciones: "RGB, USB Gamer",
        precio: 120,
        imagen: "./img-catalog/teclado.jpeg"
    },
    {
        id:10,
        titulo: "TV Sony 48",
        especificaciones: "48 pulgadas smart tv control remoto",
        precio: 590,
        imagen: "./img-catalog/tv-sony.jpg"
    },
    {
        id:11,
        titulo: "Teléfono Android X8",
        especificaciones: "4gb ram, 6.8'",
        precio: 280,
        imagen: "./img-catalog/celulares.jpeg"
    },
    {
        id:12,
        titulo: "TV Sony 54",
        especificaciones: "54 pulgadas smart tv control remoto",
        precio: 700,
        imagen: "./img-catalog/tv-sony.jpg"
    },
    {
        id:13,
        titulo: "TV Sony 60",
        especificaciones: "60 pulgadas smart tv control remoto",
        precio: 900,
        imagen: "./img-catalog/tv-sony.jpg"
    }]

/**

  * Método que lee los datos del arreglo del catálogo de productos y los muestra en la pagina ppal.
  * [Aplicación(es) que usa este método: index.html]
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: Ninguno
  * @returns {Array}  Listado de articulos en: <div class="contenedor" id="article"> ubicado en index.html
*/

function mostrarArticulos() {
    var articleNew = articulos.map(function(bar){
        return ' \
            <div class="caja">  \
                <img src="'+bar.imagen+'" >  \
                <div class="arText">        \
                    <h3 id="tituloL">'+bar.titulo+'</h3> \
                    <p id="especificacionesL"> '+bar.especificaciones+'</p> \
                    <p>Solo por: $<span id="precioL">'+bar.precio+'</span></p> \
                <img class="btnCar" src="./img/add-to-cart-1747164_960_720.png" onclick="carrito('+bar.id+')"> \
                </div>      \
            </div> '
        })
        document.getElementById("article").innerHTML = articleNew;        
}
