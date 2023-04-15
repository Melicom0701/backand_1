const express = require('express');
const mysql = require('mysql');
const user_router = express.Router();
const connection = require('./db')




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
    
    connection.query("SELECT * FROM users",(err,rows)=>{
        if (err) throw err;
        res.json(rows);
    
      })


})

function validate_age(req,res,next)
{
    var user = req.body
    if (user.age<=0) {
        res.status(400).send("Con nho qua, lo hoc di chau")
    }
    else
    next()
}
function validate_name(req,res,next)
{
    const vietnameseRegex = /^[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+$/i;
    let user = req.body;
    if (!vietnameseRegex.test(user.fullname))
    {
        res.status(400).send("Khong phai nguoi viet, ko cho dk ")
    }
    else
    next()
}


user_router.post('/',validate_age,validate_name, (req, res) => {
    var user = req.body;
    res.status(201)
    connection.query(`INSERT INTO users(fullname,age,gender) VALUES(?,?,?)`,[user.fullname,parseInt(user.age),parseInt(user.gender)],function(err,result,fields){
        if (err) throw err;
    });
    res.send(user)
    
})

user_router.get('/:id', (req, res) => {
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});

    connection.query(`SELECT * FROM users where id = (?)`,[parseInt(req.params.id)],function(err,result,fields)
    {
        if (err) throw err;
        if (result) res.json(result)
        else
        res.send(404);
    });


	
})

user_router.put('/:id',validate_age,validate_name, (req,res)=> {
    var user = req.body
    connection.query(`UPDATE users set fullname = ?, age = ?, gender = ? WHERE id = ?`,[user.fullname,user.age,user.gender,parseInt(req.params.id)],function(err,result,fields)
    {
        if (err) throw err;
        
    });


    res.send(204);
    
})
user_router.delete('/:id', (req,res)=> {
    
    id = parseInt(req.params.id)
    
    connection.query('DELETE FROM users WHERE id = ?', [id], function(error, results, fields) {
    
        if (error) throw error;
        console.log(`Deleted `);
      });
    res.send(200);
    
    
})
module.exports = user_router;