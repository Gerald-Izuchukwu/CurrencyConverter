import express, { response } from "express"
import axios from "axios"
import currencyapi from '@everapi/currencyapi-js'
const app = express()
const PORT = 6700
const client = new currencyapi('cur_live_6reAvlKGWeBLnujb3rPldrm7PM29BHi3YuZXJG1V')

function filterCurrencyData(data) {
    const filteredData = {};
    for (const currencyCode in data) {
        if (data.hasOwnProperty(currencyCode)) {
            const currency = data[currencyCode];
            filteredData[currencyCode] = {
                symbol: currency.symbol,
                name: currency.name
            };
        }
    }
    return filteredData;
}

const home = app.get('/homepage', (req, res)=>{
    res.send('Welcome, stay  bit')
})

const convert = app.post('/convert', (req, res)=>{
    const currency1 = "x" //naira
    const currency2 = "y" //dollar
    
    // convert the value of currency one to currency two
    res.send('Hi')
})

const apiCall = app.get('/currencyCall', async(req, res)=>{
    // const response = await axios.get("https://api.currencyapi.com/v3/latest&apiKey='cur_live_6reAvlKGWeBLnujb3rPldrm7PM29BHi3YuZXJG1V'")
    const response = await client.currencies()
    const filteredCurrencyData = filterCurrencyData(response.data)
    // const filteredCurrencyData = funt(response.data)
    res.send(filteredCurrencyData)
    

})

const listCurrencies = app.get('/getAllCurrencies', async(req, res)=>{
    const currencies = []
    const client = new currencyapi('cur_live_6reAvlKGWeBLnujb3rPldrm7PM29BHi3YuZXJG1V')
    const response = await client.currencies()
    const filteredCurrencyData = filterCurrencyData(response.data)
    for (const key in filteredCurrencyData){
        if(filteredCurrencyData.hasOwnProperty(key)){
            // console.log('Key', key);
            // console.log('Value', filteredCurrencyData[key].name)
            const currencyObj = {
                "key": key,
                "name": filteredCurrencyData[key].name,
                "symbol": filteredCurrencyData[key].symbol
            }
            currencies.push(currencyObj)
        }
        

    }
    // console.log(filteredCurrencyData)
    console.log(typeof(filteredCurrencyData))
    res.status(200).send(currencies)

})

const currencyInfo = app.get(`/currency`, async(req, res)=>{
    const response = await client.currencies()
    const currencies = filterCurrencyData(response.data)
    for (const key in currencies){
        
    }
    console.log(req.query.currencyid)
    if(req.query.currencyid === 'undefined' || req.query.currencyid === 'null'){
        return res.status(400).send('There is no currencyid passed')

    }
    if(req.query.currencyid){
        return 

    }
    // console.log(key)
    res.send("Hi")

})





const server = app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})
