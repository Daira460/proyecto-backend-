import express, { urlencoded } from "express"

const app = express ()
const PORT = 4000

app.use(express.json())
app.use(urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.send ("Hola")
})

app.listen(PORT, () => {
    console.log(`Servidor por Puerto ${PORT}`)
})