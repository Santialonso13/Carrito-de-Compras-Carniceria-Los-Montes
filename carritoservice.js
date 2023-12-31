function agregrarAlcarrito(producto){ 
    const memoria = JSON.parse(localStorage.getItem("productos")); 
    console.log(memoria);  
    let cuenta = 0; 
    if(!memoria){ 
        const nuevoProducto = getNuevoProductoMemoria(producto); 
        localStorage.setItem("productos",JSON.stringify([nuevoProducto])); 
        cuenta = 1;
    } else{ 
       const  indiceProducto = memoria.findIndex(achuras => achuras.id === producto.id);
       console.log(indiceProducto) 
       const nuevaMemoria = memoria; 
       if(indiceProducto === -1){  
        nuevaMemoria.push(getNuevoProductoMemoria(producto))
        cuenta = 1; 
       } else{ 
         nuevaMemoria[indiceProducto].cantidad ++; 
         cuenta = nuevaMemoria[indiceProducto].cantidad;
       } 
       localStorage.setItem("productos",JSON.stringify(nuevaMemoria)); 
       
    } 
    actualizarNumeroCarrito(); 
    return cuenta;
}   

/**funcion para restar en el carrito */

function restarAlcarrito(producto){  
    const memoria = JSON.parse(localStorage.getItem("productos")); 
    const  indiceProducto = memoria.findIndex(achuras => achuras.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){ 
        memoria.splice(indiceProducto,1);  
        localStorage.setItem("productos",JSON.stringify(memoria));
    } else{ 
        memoria[indiceProducto].cantidad--; 
    } 
    localStorage.setItem("productos",JSON.stringify(memoria)); 
    actualizarNumeroCarrito();
}


/**funcion para agregar productos al carrito */
function getNuevoProductoMemoria(producto){ 
    const nuevoProducto = producto; 
    nuevoProducto.cantidad = 1; 
    return nuevoProducto; 
}  

/**funcion para actualizar el contador del carrito **/   

const cuentaCarritoElement = document.getElementById("cuenta-carrito"); 

function actualizarNumeroCarrito(){  
    const memoria = JSON.parse(localStorage.getItem("productos"));  
    if(memoria && memoria.length >0){ 
        const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0); 
        cuentaCarritoElement.innerText= cuenta; 
        console.log(cuenta)

    } else{ 
        cuentaCarritoElement.innerText= 0;
    }
       
}  
actualizarNumeroCarrito(); 

