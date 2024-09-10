document.addEventListener('DOMContentLoaded', function() {
    
    function formatearMoneda(cantidad) {
        return new Intl.NumberFormat('es-CL', { 
            style: 'currency',
            currency: 'CLP'
        }).format(cantidad);
    }

    
    class Producto {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
        }
    }

    
    class Carrito {
        constructor() {
            this.productos = [];
        }

        agregarProducto(producto, cantidad) {
            this.productos.push({ producto, cantidad });
        }

        calcularTotal() {
            return this.productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
        }

        finalizarCompra() {
            this.productos = [];
            return "Compra realizada. Gracias por preferir Rincón del Encanto.";
        }

        mostrarDetalles() {
            return this.productos.map(item => `
                <li class="row">
                    <div class="col carrito-col">${item.producto.nombre}</div>
                    <div class="col carrito-col">${formatearMoneda(item.producto.precio)}</div>
                    <div class="col carrito-col">${item.cantidad}</div>
                    <div class="col carrito-col">${formatearMoneda(item.producto.precio * item.cantidad)}</div>
                </li>
            `).join('');
        }
    }

    
    const productos = [
        new Producto("Alas de sangre (Empíreo 1)", 23990),
        new Producto("Alas de Hierro (Empíreo 2)", 24990),
        new Producto("El señor de los anillos I: La comunidad del anillo", 14990),
        new Producto("El señor de los anillos II: Las dos torres", 12990),
        new Producto("La Hipótesis del Amor", 21990),
        new Producto("Diario de Ana Frank", 9990),
        new Producto("El Duque y yo (Bridgerton 1) Ed. Colección", 32990),
        new Producto("El vizconde que me amó", 15990),
        new Producto("Te doy mi corazón", 14990),
        new Producto("Fuego y sangre", 23990),
        new Producto("Danza de dragones", 42990),
        new Producto("Juego de tronos (Canción de Hielo y Fuego #1)", 23990)
    ];

   
    const carrito = new Carrito();

   
    function actualizarCarrito() {
        const carritoItems = document.getElementById('carrito-items');
        carritoItems.innerHTML = carrito.mostrarDetalles();
        document.getElementById('total').textContent = `Total: ${formatearMoneda(carrito.calcularTotal())}`;
    }

   
    function manejarCompra() {
        document.querySelectorAll('.boton').forEach((boton, index) => {
            boton.addEventListener('click', () => {
                
                mostrarAlerta(index);
            });
        });

        document.querySelector('.alerta-cierre').addEventListener('click', () => {
            document.querySelector('.alerta').style.display = 'none'; 
        });

        document.getElementById('finalizar-compra').addEventListener('click', () => {
            const confirmar = confirm("¿Confirma la compra?");
            if (confirmar) {
                alert(carrito.finalizarCompra());
                actualizarCarrito();
            }
        });
    }

   
    function mostrarAlerta(productoIndex) {
        document.querySelector('.alerta').style.display = 'block';
        document.getElementById('confirmar-cantidad').onclick = () => {
            const cantidad = parseInt(document.getElementById('cantidad-productos').value, 10);
            if (isNaN(cantidad) || cantidad <= 0) {
                alert("Por favor ingresa una cantidad válida.");
                return;
            }
            if (productoIndex < productos.length) {
                const productoSeleccionado = productos[productoIndex];
                carrito.agregarProducto(productoSeleccionado, cantidad);
                actualizarCarrito();
                document.querySelector('.alerta').style.display = 'none'; // Oculta la alerta
                document.getElementById('cantidad-productos').value = '';
            } else {
                alert("Producto no válido.");
            }
        };
    }

    
    manejarCompra();
});


