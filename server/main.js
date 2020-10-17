const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, html) => {
        res.send(html)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))