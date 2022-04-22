const express = require('express')
const products = require('./data/products')
const dotenv = require("dotenv")

// const [products, setProducts] = useState([])

// useEffect(() => {
//   const fetchProducts = async () => {
//     const { data } = await axios.get('/api/products')
//     setProducts(data)
//   }
//   fetchProducts()
// }, [])

dotenv.config()

const app = express()

// app.get('/', (req, res) => {
//     res.send("API is running")
// })


app.get('/homepage', (req, res) => {
    res.json(products)
})

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))