const express = require('express')
const app = express()
const port = 8080

app.set('view engine','ejs');

app.get('/', (req, res) => {
//   Si ya iniciamos mostrar bienvenida

// Si no hemos iniciado sesión redireccionar a /login
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    // Recibe Credenciales e inicia session
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})