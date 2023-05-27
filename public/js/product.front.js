
const button_clik = document.querySelectorAll(".prod_button")

button_clik.addEventListener("click", mensaje(this.id));

function mensaje() {
    Swal.fire({
        title: `${username} se ha conectado al chat`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
}
