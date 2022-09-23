
require('dotenv').config();
const app = require('express')(), fs = require('fs'), mysql = require('mysql'), connect = mysql.createPool(require('./config'));
app.use(require('express').urlencoded({extended:true}));
//GET ALL
app.get('/cars', (req,res)=>{
    connect.query('select * from hasznaltautok', (err,data,field)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(data);
    });
});
//GET ONE
app.get('/car/:id', (req,res)=>{
    connect.query(`select * from hasznaltautok where id=${req.params.id}`, (err,data,fields)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(data);
    });
});
//INSERT ONE
app.post('/push-car', (req,res)=>{
    let data = {
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        year: req.body.year,
        desc: req.body.desc,
        cond: req.body.cond,
        price: req.body.price,
        status: req.body.status
    };
    connect.query(`insert into hasznaltautok values (null, '${data.manufacturer}', '${data.type}', ${data.year}, '${data.desc}', '${data.cond}', ${data.price}, ${data.status})`, (err, message)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(message);
    })
});
//UPDATE
app.post('/update-car/:id', (req,res)=>{
    let data = {
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        year: req.body.year,
        desc: req.body.desc,
        cond: req.body.cond,
        price: req.body.price,
        status: req.body.status
    };
    connect.query(`update hasznaltautok set gyarto='${data.manufacturer}', tipus='${data.type}', evjarat=${data.year}, leiras='${data.desc}', allapot='${data.cond}', ar=${data.price}, status=${data.status}`, (err,message)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(message);
    });
});
//DELETE ALL
app.get('/demolish-all-cars', (req,res)=>{
    connect.query('delete from hasznaltautok', (err, message)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(message);
    });
});
//DELETE ONE
app.post('/demolish-car/:id', (req,res)=>{
    connect.query('delete from hasznaltautok where id='+req.params.id, (err, message)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(message);
    });
});



app.listen(process.env.PORT, console.log(process.env.PORT));