import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080")

describe("Testing de App AromaCaffe", () => {

    describe("Test de módulo para Signup", () => {
        it("El endpoint POST /api/session/signup debe resgistrar un nuevo usuario en este caso admin", async () => {
            const userMock = {
                name: "Usermock",
                last_name: "R2",
                age: "30",
                email: "Usermock@coder.com",
                password: "R2D2"
            }

            const result = await requester.post('/api/session/signup').send(userMock)
            // console.log("result", result)
            expect(result).to.be.ok
        })
    })

    describe("Test de módulo para Login", () => {
        it("El endpoint POST /api/session/login debe logear al usuario", async () => {
            const userMock = {
                email: "Usermock@coder.com",
                password: "R2D2"
            }
            const result = await requester.post('/api/session/login').send(userMock)
            console.log("result", result)
            expect(result).to.be.ok
        })
    })

    describe("Test de módulo crear un producto", () => {

        before(async function () {
            const userMock = {
                email: "Usermock@coder.com",
                password: "R2D2"
            }
            const login = await requester.post('/api/session/login').send(userMock)
            console.log("login", login)
        })

        it("El endpoint POST /api/products/ debe crear unn producto", async () => {

            const ProductMock = {
                title: "Product Mock",
                description: "Producto de prueba",
                price: 4860,
                thumbnail: "imagen",
                code: 2006,
                stock: 90,
                category: "Café",
                status: true
            }

            const result = await requester.post('/api/products').send(ProductMock)
            console.log("product", result)
            expect(result).to.be.ok
        })
    })

})