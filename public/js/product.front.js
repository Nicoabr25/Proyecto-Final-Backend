
// const button_clik = document.querySelectorAll(".prod_button")

// button_clik.addEventListener("click", (e) => {
//     e.preventDefault();
//     AsignarBotones();
// });


function AsignarBotones() {
    let buttons = document.querySelectorAll(".prod_button");
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            mensaje();
        })
    }
};

function mensaje() {
    Swal.fire({
        title: `Se ha agregado el producto al carrito`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
}


document.addEventListener("DOMContentLoaded", AsignarBotones)