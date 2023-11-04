const colors = require ('colors')

const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    console.log('MongoDB start connecting...')
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;