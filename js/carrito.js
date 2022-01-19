class Carrito {
  //añadir producto al carrito
  comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
      const producto = e.target.parentElement.parentElement;
      //Envío el producto seleccionado para tomar sus datos
      this.leerDatosProducto(producto);
    }
  }
  //Leer datos del producto
  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h4").textContent,
      precio: producto.querySelector(".precio span").textContent,
      id: producto.querySelector("button").getAttribute("data-id"),
      cantidad: 1,
    };
    this.insertarCarrito(infoProducto);
  }
  //insertamos producto al carrito
  insertarCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
    listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
  }
  //Eliminar el producto del carrito en el DOM
  eliminarProducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute("data-id");
      window.location.reload();
    }
    this.eliminarProductoLocalStorage(productoID);

    this.calcularTotal();
  }
  //Elimina todos los productos
  vaciarCarrito(e) {
    e.preventDefault();
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
      window.location.reload();
    }
    this.vaciarLocalStorage();
    $("#carritoCantidad").html(`0`);
    return false;
  }
  //Almacenar en el LS
  guardarProductosLocalStorage(producto) {
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    $("#carritoCantidad").html(`${productos.length}`);
    localStorage.setItem("productos", JSON.stringify(productos));
  }
  //comprobamos productos guardados en LS
  obtenerProductosLocalStorage() {
    let productoLS;
    if (localStorage.getItem("productos") === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
  }

  //Mostrar los productos guardados en el LS
  leerLocalStorage() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>`;
      listaProductos.appendChild(row);
      
    });
  }
  leerLocalStorageCompra() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <input type="number" class="form-control cantidad" min="1" value= ${
                  producto.cantidad
                }>
            </td>
            <td >${producto.precio * producto.cantidad}</td>
                <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${
                  producto.id
                }"></a>
            </td>`;
      listaCompra.appendChild(row);
    });
  }

  eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });
    $("#carritoCantidad").html(productosLS.length)
    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  //Elimina todos los datos del LS
  vaciarLocalStorage() {
    localStorage.clear();
  }
  procesarPedido(e) {
    e.preventDefault();
    if (this.obtenerProductosLocalStorage().length === 0) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "No seleccionaste productos!",
        showConfirmButton: false,
        timer: 30000,
      });
    } else {
      location.href = "compra.html";
    }
  }

  //Calcular montos
  calcularTotal() {
    let productosLS;
    let total = 0;
    productosLS = this.obtenerProductosLocalStorage();
    for (let i = 0; i < productosLS.length; i++) {
      let element = Number(productosLS[i].precio * productosLS[i].cantidad);
      total = total + element;
    }

    document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
  }
}
