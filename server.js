const express = require('express');
const app = express();
const technoDoc = require('techno-gendoc');
const path = require('path');
let expressWs = require('express-ws')(app);


const emailObj = {};
['/', '/login', '/register', '/scoreboard', '/user', '/game', '/menu'].forEach((path) => { app.use(path, express.static('public')); });
app.use(express.static('public'));

app.ws('/ws/field', (ws, req) => {

    console.log('Generate field');

    let randomArray = (length, max) => [...new Array(length)]
    .map((_, i) => Math.round(Math.random() * max));

    ws.on('message', (msg) => {
        try {
            let message = {
                type: 'field',
                data: randomArray(192, 1),
            };
            ws.send(JSON.stringify(message));
        } catch (err) {
            console.error(err);
        }
    });

    ws.on('close', (evt) => {
        console.log('EXIT');
    });

    // try {
    //     ws.send(JSON.stringify(message));
    // } catch (err) {
    //     console.error(err);
    // }

});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});
