const path = require('path')
const express = require('express');
const colors = require ('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

// Debug statement to check if .env is loaded
console.log("below is process.env.NODE_ENV")
console.log(process.env.NODE_ENV);

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', require('./routes/userRoutes'))


//serve frontend
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))
//   app.get('*', (req, res)=>
//   res.sendFile(
//     path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//   )
//   )
// } else {
//   app.get('/', (req, res)=> res.send('please set to production'))
// }

app.use(errorHandler);

app.listen(port, ()=>console.log(`Server started on port ${port}`))
