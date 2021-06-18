const express = require('express')
const app = express()
const port = 9000
const fetch = require("node-fetch");
const ejs = require('ejs')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

const portfolio_url = "https://omwcf64tte.execute-api.ap-south-1.amazonaws.com/dev/stocks"

const exchg_url = "https://n79pz3sawa.execute-api.ap-south-1.amazonaws.com/dev/currency"

class DeleteHTTP {
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const resData = 'resource deleted...';
        return resData;
    }
}

app.get('/', async (req, res) => {
    const response = await fetch(portfolio_url);
    var items = await response.json();
    res.render('home', {
        items:items
    })
})

app.get('/exchange', async (req, res) => {
    const response = await fetch(exchg_url);
    var items = await response.json();
    res.render('exchg', {
        items:items
    })
})

app.delete('/stock/delete/:id', async(req, res) => {
    const http = new DeleteHTTP;
    const { id } = req.params
    http.delete(portfolio_url+`/${id}`)
    .then(data => console.log(data))
    .catch(err => console.log(err));
    console.log("Stock Deleted with id ", id)
    res.redirect('/')
})

app.delete('/currency/delete/:id', async(req, res) => {
    const http = new DeleteHTTP;
    const { id } = req.params
    http.delete(exchg_url+`/${id}`)
    .then(data => console.log(data))
    .catch(err => console.log(err));
    console.log("Currency Deleted with id ", id)
    res.redirect('/exchange')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})