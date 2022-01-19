const compra=new Carrito();
const listaCompra=document.querySelector("#lista-compra tbody");
const carrito= document.getElementById("carrito");
const procesarCompraBtn=document.getElementById("procesar-compra");
const cliente=document.getElementById("cliente");
const direccion=document.getElementById("direccion");

cargarEventos();

function  cargarEventos() { 
    document.addEventListener("DOMContentLoaded",compra.leerLocalStorageCompra());
//Eliminar productos del carrito
    carrito.addEventListener("click", (e)=> {compra.eliminarProducto(e)  });

    compra.calcularTotal();
    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener("click", procesarCompra);
}

function procesarCompra(e) { 
    e.preventDefault();

    if(compra.obtenerProductosLocalStorage().length===0){
        Swal.fire({
            type:"error",
            title: "Error",
            text: "No seleccionaste productos!",
            timer: 100000,
            showConfirmButton:false
        }).then(function () { 
            window.location="index.html";
         })
    }else if(cliente.value==="" || direccion.value===""){
        Swal.fire({
            type:"error",
            title: "Error",
            text: "Por favor, completa tu nombre y dirección",
            timer: 100000,
            showConfirmButton:false
        })
    }
    else {
        const cargandoGif=document.querySelector("#cargando");
        cargandoGif.style.display="block";
        
        const enviado=document.createElement("img");
        enviado.src="img/mail.gif";
        enviado.style.display="block";
        enviado.width="150";

        setTimeout (()=>{
            cargandoGif.style.display="none";
            document.querySelector("#loaders").appendChild(enviado);
            setTimeout(()=>{
                enviado.remove();
                compra.vaciarLocalStorage();
                window.location="index.html";
            }, 2000);
        },3000);
    }
 }