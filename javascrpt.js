//catalogo inicial

let articulos = [
    {
        id: 1,
        titulo: "TV Sony 42",
        especificaciones: "42 pulgadas smart tv control remoto",
        precio: 500,
        imagen: "img-catalog/tv-sony.jpg"
    },
    {
        id:2,
        titulo: "Teléfono Android X5",
        especificaciones: "3gb ram, 6.8'",
        precio: 250,
        imagen: "img-catalog/celulares.jpeg"
    },
    {
        id:3,
        titulo: "Laptop Gamer DELL",
        especificaciones: "14', 16gb ram, teclado iluminado",
        precio: 590,
        imagen: "img-catalog/laptops.jpg"
    },
    {
        id:4,
        titulo: "Monitor Curvo SAMSUNG",
        especificaciones: "60'1080p, OLED",
        precio: 900,
        imagen: "img-catalog/monitor-large.jpg"
    },
    {
        id:5,
        titulo: "Audifonos GAMERS",
        especificaciones: "Sonido Surround",
        precio: 145,
        imagen: "img-catalog/audifonos.jpg"
    },
    {
        id:6,
        titulo: "Disco Duro Externo",
        especificaciones: "SSD, Usb 3.1, 1TB",
        precio: 150,
        imagen: "img-catalog/disco-ext.jpg"
    },
    {
        id:7,
        titulo: "Monitor 19",
        especificaciones: "Para PC, LED HDMI",
        precio: 150,
        imagen: "img-catalog/monitor.jpg"
    },
    {
        id:8,
        titulo: "Pendrive 128GB",
        especificaciones: "Usb3 de alta velocidad",
        precio: 40,
        imagen: "img-catalog/pendrive.png"
    },
    {
        id:9,
        titulo: "Teclado Retroiluminado",
        especificaciones: "RGB, USB Gamer",
        precio: 120,
        imagen: "img-catalog/teclado.jpeg"
    },
    {
        id:10,
        titulo: "TV Sony 48",
        especificaciones: "48 pulgadas smart tv control remoto",
        precio: 590,
        imagen: "img-catalog/tv-sony.jpg"
    },
    {
        id:11,
        titulo: "Teléfono Android X8",
        especificaciones: "4gb ram, 6.8'",
        precio: 280,
        imagen: "img-catalog/celulares.jpeg"
    },
    {
        id:12,
        titulo: "TV Sony 54",
        especificaciones: "54 pulgadas smart tv control remoto",
        precio: 700,
        imagen: "img-catalog/tv-sony.jpg"
    },
    {
        id:13,
        titulo: "TV Sony 60",
        especificaciones: "60 pulgadas smart tv control remoto",
        precio: 900,
        imagen: "img-catalog/tv-sony.jpg"
    }]

// mostrar los articulos en el catalogo

mostrarArticulos();


//agregar articulos nuevos dede la plantilla html

function agregar_articulo() {
    let idNumber = articulos.length + 1;
    const newTitulo = document.getElementById("titulo").value;
    const newespecificaciones = document.getElementById("especificaciones").value;
    const newPrecio = document.getElementById("precio").value; 
    const newImg = document.getElementById("imagen").textContent;
     
    let newArticulo = {
        id: idNumber,
        titulo: newTitulo,
        especificaciones: newespecificaciones,
        precio: newPrecio,
        imagen: newImg
    }
   
    articulos.push(newArticulo); // agrega registros al principio del arreglo
    mostrarArticulos();
    window.alert("El artículo se ha registrado correctamente...")
    document.getElementById("titulo").value = "";
    document.getElementById("especificaciones").value = "";
    document.getElementById("precio").value = ""; 
    document.getElementById("imagen").textContent = "";
    document.getElementById("div1").textContent = "";


}

//mostrar articulos en el catalogo
function mostrarArticulos() {
    var articleNew = articulos.map(function(bar){
        return ' \
            <div class="caja">  \
                <img src="'+bar.imagen+'" >  \
                <div class="arText">        \
                    <h3 id="tituloL">'+bar.titulo+'</h3> \
                    <p id="especificacionesL"> '+bar.especificaciones+'</p> \
                    <p>Solo por: $<span id="precioL">'+bar.precio+'</span></p> \
                <img class="btnCar" src="img/add-to-cart-1747164_960_720.png" onclick="carrito('+bar.id+')"> \
                </div>      \
            </div> '
        })
        document.getElementById("article").innerHTML = articleNew;      
}

//agregar al carrito

var articuloCarrito = []; //arreglo del carrito

function carrito(idx) {
    
    if (articuloCarrito.length === 6){
        window.alert("El máximo de productos que se pueden comprar es 6...")
    }else {
 
        let articuloCarritoTemp = {
         titulo: articulos[idx - 1].titulo,
         especificaciones: articulos[idx - 1].especificaciones,
         precio: articulos[idx - 1].precio,
         imagen: "img/tv-sony.jpg"
        }
        articuloCarrito.push(articuloCarritoTemp);     //agrega el articulo al array articuloCarrito

        // mostrar los productos en el carrito
        var articleCarrito = articuloCarrito.map(function(bar){  //arreglo temporal para montar los articulos
         return ' \
             <p id="titulo"  class="font-size: 10px">'+bar.titulo+'</p> \
            <p>Precio: $<span id="precio">'+bar.precio+'</span></p> \
            <hr><br>'
        })
        let monto = 0;
        var montoTotal = articuloCarrito.map(function(bar){
        return monto = monto + Number(bar.precio);
        })
        //var montoTotal = articuloCarrito.map((bar) => Number(bar.precio));  //calcula el subtotal a medida que se agregan articulos al carrito
        
        document.getElementById("muestraCarrito").innerHTML = articleCarrito;  // muestra el listado del contenido del carrito
        document.getElementById("counter").innerHTML = articleCarrito.length;   // muestra el contador del carrito
        document.getElementById("total").innerHTML = "<b style='color: Red;'>Total: " + monto + "</b><br>";     //muestra el monto total
        document.getElementById("btnVaciar").innerHTML = '<h2 onclick="vaciar()">Vaciar</h2> ';
        console.log("articulos del carrito: " + articuloCarrito.length)   

    }
}


//   Ver el monto facturado

function verMonto() {
    let monto = 0;
    var articleCarrito = articuloCarrito.map(function(bar){
        return monto = monto + Number(bar.precio);      
      })
    //var articleCarrito = articuloCarrito.map((bar) => monto + Number(bar.precio));
    if (monto == 0){
        window.alert("No tiene ningun articulo en el carrito...");
    } else {
    window.alert("Total a cancelar: $" + monto)
    vaciar();
    }
}



// vaciar el carrito
function vaciar() {
    articuloCarrito = [];
    articleCarrito = [];

    document.getElementById("muestraCarrito").innerHTML = ""; //limpia el listado
    document.getElementById("total").innerHTML = "";     //limpia el monto total
    document.getElementById("counter").innerHTML = articuloCarrito.length;
    document.getElementById("btnVaciar").innerHTML = '';
   
}
//************** agregar imagen**************+ */
function addImg(text) {
    
    document.getElementById("div1").innerHTML = '<img id="drag" src="' + text + '"></img>'
    document.getElementById("imagen").innerHTML = text;
}

//*************   agregar articulos al stock  *****************************+ */
function openNav() {
    document.getElementById("mySidepanel").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
