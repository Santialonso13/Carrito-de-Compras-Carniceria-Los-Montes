const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetas(productos){ 
    productos.forEach(producto => { 
     const nuevoProducto = document.createElement("div"); 
     nuevoProducto.classList ="tarjeta-producto"; 
     nuevoProducto.innerHTML = `  
        <img src="${producto.img}"> 
        <h3>${producto.nombre}</h3> 
        <p>$${producto.precio}</p> 
        <button>COMPRAR</button>
     `
     contenedorTarjetas.appendChild(nuevoProducto); 
     nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", ()=> agregrarAlcarrito(producto));
        
    });

} 

crearTarjetas(productos);