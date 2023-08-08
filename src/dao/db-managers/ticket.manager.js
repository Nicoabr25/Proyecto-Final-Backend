import { ticketsModel } from "../models/ticket.model.js";
import { CartManager } from "../../config/persistance.js";
import { v4 as uuidv4 } from 'uuid'


class TicketManager {
    constructor() { }

    async newTicket(arr, userEmail) { //recibe el array del carrito (tikectProduct) y el usuario que realiza la compra (req.session.email.toString())
        try {
            const purchase_datetime = new Date().toISOString();
            const amount = arr.reduce((acc, el) => acc + el.product.price * el.quantity, 0)
            const purchaser = userEmail
            const newTicket = {
                code: uuidv4(),
                purchase_datetime: purchase_datetime,
                amount: amount,
                purchaser: purchaser
            }
            console.log("newTicket", newTicket)
            const Ticket = await ticketsModel.create(newTicket)
            return Ticket
        } catch (error) {
            throw new Error
        }
    }
}

export default TicketManager;