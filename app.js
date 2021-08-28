const express = require('express');
const mongoose = require('mongoose')
const trillers = require('./routes/trillers')
const cors = require('cors')

//Conectarnos a la base de datos
mongoose.connect('mongodb://localhost:27017/final', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/trillers', trillers);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Api RESTul Ok, y ejecutandose...")
})