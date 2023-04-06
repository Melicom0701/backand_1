const express = require('express');
const app = express();
const port = 8080; 
const userRoute = require('./routes/user')

app.set('views', './views'); 
app.set('view engine', 'pug'); 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use('/user', userRoute);

app.get('/', function(req, res){
	res.send("<h2>Konnchiwa</h2>");
})


app.listen(port, function(){
    console.log('Your app running on port '+ port);
})