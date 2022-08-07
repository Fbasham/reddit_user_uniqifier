const searchRedditUser = require('./searchRedditUser.js')
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/:user',async (req,res)=>{
  return res.json(await searchRedditUser(req.params.user))
})

app.listen(3434,_=>console.log('server running...'))