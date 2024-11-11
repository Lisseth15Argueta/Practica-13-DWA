const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footerCard = document.querySelector("#footerFard");
const totalAmount = document.querySelector("#totalAmount");
let carritoArray = [];

let totalCompra = 0;

document.addEventListener("click", (e) => {
    if (e.target.matches(".card button")) {
        agregarCarrito(e);
    }

    if (e.target.matches(".list-group-item .btn-info")) {
        btnAumentar(e);
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});

const agregarCarrito = (e) => {
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseFloat(e.target.dataset.precio),
    };

    const index = carritoArray.findIndex((item) => item.id === producto.id);
    if (index === -1) {
        carritoArray.push(producto);
    } else {
        carritoArray[index].cantidad++;
    }
    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = "";
    totalCompra = 0;

    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        const subtotal = item.precio * item.cantidad;
        clone.querySelector("div .lead span").textContent = subtotal.toFixed(2);
        totalCompra += subtotal;
        clone.querySelector(".btn-info").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        carrito.appendChild(clone);
    });
    pintarFooter();
};

const pintarFooter = () => {
    totalAmount.textContent = totalCompra.toFixed(2);

    if (totalCompra > 0) {
        footerCard.classList.remove("d-none");
    } else {
        footerCard.classList.add("d-none");
    }
};

const btnAumentar = (e) => {
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    carritoArray = carritoArray
        .map((item) => {
            if (item.id === e.target.dataset.id) {
                if (item.cantidad > 1) {
                    item.cantidad--;
                    return item;
                }
                return null;
            }
            return item;
        })
        .filter((item) => item !== null);
    pintarCarrito();
};
