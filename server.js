'use strict';

const express = require('express');
const bp = require('body-parser');
const path = require('path');
const cors = require('cors');


app.use(cors());
app.use(bp.json());
app.use(bp.text());
app.use(express.static('static'));

let last = 'Text';

let users = [
    {
        name: 'Ivan',
        email: 'dcfgfgf@fgf.ru',
        age: 34
    },
    {
        name: 'Ivan2',
        email: 'dcfgffggf@fgfgf.ru',
        age: 74
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/getMessage', (req, res) => {
    res.send(`Последнее сообщение: ${last}`);
});

app.post('/sendMessage', (req, res) => {
    last = req.body;
    res.status(200).end();
});

app.get('/user/:id', (req, res) => {
    const user = users[req.params.id - 1];
    if (user) {
        res.send(`Пользователь: ${JSON.stringify(user.name)}. Почта: ${JSON.stringify(user.email)}`);
    } else {
        res.status(404);
        res.send({
            error:'Пользователь не найден'
        });
    }
});

app.get('/users', (req, res) => {
    if (users.length > 0) {
        res.send(JSON.stringify(users));
    } else{
        res.status(404);
        res.send({
            error:'Пользователи не найдены'
        });
    }
});

app.post('/user', (req, res) => {
    let length = users.push(JSON.parse(req.body));
    res.status(200);
    res.send(`Количество пользователей`);
});

app.listen(8080, () => {
    console.log('Server starts on: 8080!!!');
});
