import express, { response } from "express"
import axios from "axios"
import currencyapi from '@everapi/currencyapi-js'
const app = express()
const PORT = 6700

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
function funt (data){
    const currencies = []
    for (const key in data){
        currencies.push(key)
    }
    return currencies
}

const home = app.get('/homepage', (req, res)=>{
    res.send('Conversion happened')
})

const convert = app.post('/convert', (req, res)=>{
    const currency1 = "x" //naira
    const currency2 = "y" //dollar
    
    // convert the value of currency one to currency two
    res.send('Hi')
})

const apiCall = app.get('/currencyCall', async(req, res)=>{
    // const response = await axios.get("https://api.currencyapi.com/v3/latest&apiKey='cur_live_6reAvlKGWeBLnujb3rPldrm7PM29BHi3YuZXJG1V'")
    // res.json(response)
    // console.log(response.data)


    const client = new currencyapi('cur_live_6reAvlKGWeBLnujb3rPldrm7PM29BHi3YuZXJG1V')

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
            console.log('Key', key);
            console.log('Value', filteredCurrencyData[key].name)
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




const server = app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})
