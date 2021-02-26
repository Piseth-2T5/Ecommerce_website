const express = require('express')
const app = express();
const path = require('path')
const postRoute = require('./route/post')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const port = 4000;

app.set('veiw engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', postRoute)

mongoose.connect('mongodb+srv://dbuser2:dbuser2@cluster0.9fxex.mongodb.net/EcommerceII?retryWrites=true&w=majority',{useNewUrlParser: true})
    .then(()=>{
        console.log('DB is connected')
        app.listen(port, ()=>{
            console.log('api is working')
        })
    })
    .catch(err=>{
        console.log(err)
    })
