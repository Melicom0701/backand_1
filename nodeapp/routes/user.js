const express = require('express');
const user_router = express.Router();

var users = [
	{
		"id": 1,
		"fullname": "Nguyen Hoang Nhat Linh",
		"gender": true,
		"age": 18
	},
	{
		"id": 2,
		"fullname": "Nguyen Thi Tuong",
		"gender": false,
		"age": 15
	}
]
id = 3;

user_router.get('/', function(req, res){
    res.status(200);
	res.send(users);
})



user_router.post('/', (req, res) => {
    var user = req.body;
    id++;
    user.id = id;
	users.push(user)
    console.log(user);
    res.status(201);
    res.send(user)
    
})

user_router.get('/:id', (req, res) => {
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
   
    if (user)
    {
        res.status(200);
        res.send(user);
    }
    else{
        res.send(404);
    }

	
})

user_router.put('/:id', (req,res)=> {
    var user = req.body
    console.log(req.body)
    id = parseInt(req.params.id)
    i = 0
    for ( i = 0;i<users.length;i++)
    if (id = users[i].id) break;
    user.id = id;
    users[i] = user;
    res.send(204);
    
})
user_router.delete('/:id', (req,res)=> {
    
    id = parseInt(req.params.id)
    i = 0
    for ( i = 0;i<users.length;i++)
    if (users[i])
    if (id == users[i].id) break;
    if (users[i])
    {
    if (users[i].id==id)
    {
    users = users.filter(function(item) {
        return item.id !== id
    })
    res.send(204);}
    }
    else res.send(404);
    
    
})
module.exports = user_router;