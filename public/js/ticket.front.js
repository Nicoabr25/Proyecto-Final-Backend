
const confirm_purchase_click = document.querySelector("#confirm_purchase")
const empty_cart_click = document.querySelector("#empty_cart")


confirm_purchase_click.addEventListener("click", (e) => {
    confirm_purchase_message();
});

function confirm_purchase_message() {
    Swal.fire({
        title: `Se ha agregado el producto al carrito`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
}

empty_cart_click.addEventListener("click", (e) => {
    empty_cart_message();
});

function empty_cart_message() {
    Swal.fire({
        title: `Se ha vaciado el carrito`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
}
