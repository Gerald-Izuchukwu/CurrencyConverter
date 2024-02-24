import express from "express"
import axios from "axios"
import currencyapi from '@everapi/currencyapi-js'
const app = express()
const PORT = 6700



const server = app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})
