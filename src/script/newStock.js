//*************   agregar articulos al stock  *****************************+ */


/***************************************************************************************************************
  * Métodos que abre y cierran una ventana lateral que muestra un formulario para
  * ingresar nuevos artículos al catálogo...
  * [Aplicación(es) que usa este método: index.html: <button class="openbtn"> y  <div id="newStock">
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: 
  * @returns {Array}  
***************************************************************************************************************** */
function openNav() {
  document.getElementById("newStock").style.width = "80%";
}
  
function closeNav() {
  document.getElementById("newStock").style.width = "0";
}



/***************************************************************************************************************
  * Métodos que toma los valores del formulario y los guarda en el arreglo del catálogo
  * [Aplicación(es) que usa este método: index.html => <form>
  * @author Ing. Julio Añez
  * @param {number|string|object|boolean|array} Parametros: 
  * @returns {Array}  
***************************************************************************************************************** */
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
          title: newTitulo,
          category: newespecificaciones,
          price: newPrecio,
          image: newImg
      }   
      articulos.push(newArticulo); 
      let stockCantidad = {
          id: idNumber,
          disponible: 20
      }   
      stock.push(stockCantidad); 
        
      
      document.getElementById("titulo").value = "";
      document.getElementById("especificaciones").value = "";
      document.getElementById("precio").value = ""; 
      document.getElementById("imagen").textContent = "";
      document.getElementById("div1").textContent = "";
      mostrarArticulos();
      popup("El artículo se ha registrado correctamente...");
  }
}




/****************************************************************************************************
* Método que selecciona una imagen para representar al nuevo articulo del catálogo
* [Aplicación(es) que usa este método: index.html => <div class="selectImg">
* @author Ing. Julio Añez
* @param {number|string|object|boolean|array} Parametros: Texto: Ruta de la imagen seleccionada
* @returns {Array}   
******************************************************************************************************/

function addImg(text) {  
  document.getElementById("div1").innerHTML = '<img id="drag" src="' + text + '"></img>'
  document.getElementById("imagen").innerHTML = text;
}


