// import { lastTicket } from "../../src/controllers/cart.controller.js";

const confirm_purchase_click = document.querySelector("#confirm_purchase")
const empty_cart_click = document.querySelector("#empty_cart")

// const Ticket = lastTicket
// console.log("Ticket", Ticket)
// const Ticket_code = Ticket.code
// const Ticket_purchase_datetime = Ticket.purchase_datetime
// const Ticket_amount = Ticket.amount
// const Ticket_purchaser = Ticket.purchaser

confirm_purchase_click.addEventListener("click", (e) => {
    confirm_purchase_message();
});

function confirm_purchase_message() {
    Swal.fire({
        title: `Se ha competado al compra`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
}


// function confirm_purchase_message() {
//     Swal.fire({
//         title: '<strong>HTML <u>example</u></strong>',
//         icon: 'succes',
//         html:
//             'Se ha realizado la compra satisfactoriamente</b>, ' +
//             'codigo: 1 </b>' +
//             'Fecha : 2 </b>' +
//             'Monto: $ 3 </b>' +
//             'Se enviaran los datos de la compra a 4 </b>',
//         showCloseButton: true,
//         showCancelButton: false,
//         focusConfirm: false,
//         confirmButtonText:
//             '<i class="fa fa-thumbs-up"></i> Great!',
//         confirmButtonAriaLabel: 'Ok!',
//     })
// }

empty_cart_click.addEventListener("click", (e) => {
    e.preventDefault();
    empty_cart_message();
});

function empty_cart_message() {
    Swal.fire({
        title: `Se ha vaciado el carrito`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
}


// text: `Se ha realizado la compra satisfactoriamente.
// codigo: 1
// Fecha : 2
// Monto: $ 3
// Se enviaran los datos de la compra a 4`,