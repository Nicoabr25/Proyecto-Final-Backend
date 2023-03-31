const socket = io();


let username;

Swal.fire({
    title: 'Bienvenido, Identificate:',
    input: "text",
    text: 'Ingresa tu nombre de usuario:',
    inputValidator: (value) => {
        return !value && "No has ingresado tu usuario"
    },
    allowOutsideClick: false,
    icon: 'info',
    confirmButtonText: 'Cool'
}).then((result) => {

    username = result.value;
    socket.emit("new-user", username); //cuando me logeo envio una notificacion tiupo new-user al servidor
});

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (ev) => { //Escucha cuando se presiona una tecla
    if (ev.key === "Enter") {    //Se ejecuta cuando la tecla presionada es enter 
        const input = chatInput.value;
        if (input.trim().length > 0) {//le quito todos los espacioas adelante y detrás del mensaje y veo que haya texto
            socket.emit("messages", { username, message: input });
            chatInput.value = "" //una vez se envia el mensaje se borra de la barra de input
        }
    }
});

const chatMessages = document.getElementById("chat-messages");
socket.on("messages", (data) => { //cuando escucha un mensaje tipo messages (linea 29)
    let message = "";
    data.forEach((m) => {
        message += `<b>${m.username}:</b> ${m.message}</br>`;
    });
    chatMessages.innerHTML = message
});

socket.on("new-user", (username) => { //cuando recibo una alerta de new user genera una alerta
    Swal.fire({
        title: `${username} se ha conectado al chat`,
        toast: true, //para que se vaya de la pantalla solo
        position: "top-end",
    });
});
