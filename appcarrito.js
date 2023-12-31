const contenedorTarjetas = document.getElementById("productos-container"); 
const unidadesElement = document.getElementById("unidades"); 
const precioElement = document.getElementById("precio"); 
const carritoVacioElement = document.getElementById("carrito-vacio"); 
const totalesElements = document.getElementById("totales"); 
const reiniciarCarritoElement = document.getElementById("reiniciar");


function crearTarjetas() { 
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos)
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "tarjeta-producto";
            nuevoProducto.innerHTML = `  
           
        <h3>${producto.nombre}</h3> 
        <p>$${producto.precio}</p>  
        <div>
            <button>-</button>   
            <span class="cantidad">${producto.cantidad}</span>
            <button>+</button> 
        </div> 

     `;
            contenedorTarjetas.appendChild(nuevoProducto);
            nuevoProducto 
            .getElementsByTagName("button")[1]
            .addEventListener("click", (e) => { 
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0]; 
                cuentaElement.innerText = agregrarAlcarrito(producto);  
                actualizarTotales();
              
            });
            nuevoProducto
            .getElementsByTagName("button")[0] 
            .addEventListener("click", (e) =>{  
                 restarAlcarrito(producto) ;
                 crearTarjetas();   
                 actualizarTotales();
                
        });
     }); 
     
   }

}

crearTarjetas();  
actualizarTotales();

function actualizarTotales(){ 
    const productos = JSON.parse(localStorage.getItem("productos"));  
    let unidades = 0;  
    let precio = 0;

    if(productos && productos.length>0){ 
        productos.forEach(producto =>{  
          unidades += producto.cantidad; 
          precio += producto.precio * producto.cantidad; 

        }) 
        unidadesElement.innerText = unidades; 
        precioElement.innerText = precio; 
    }
} 

function revisarVacio(){  
    const productos = JSON.parse(localStorage.getItem("productos"));  
    carritoVacioElement.classList.toggle("vacio", productos && productos.length>0); 
    totalesElements.classList.toggle("vacio", ! (productos && productos.length>0));
} 
 
revisarVacio();   

/*Reiniciar Carrito de compras*/

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito(){  
    localStorage.removeItem("productos");  
    actualizarTotales();  
    revisarVacio();
    crearTarjetas();  
}