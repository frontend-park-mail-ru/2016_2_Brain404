const express = require('express');
const app = express();
const technoDoc = require('techno-gendoc');
const path = require('path');


const emailObj = {};
['/', '/login', '/register'].forEach((path) => { app.use(path, express.static('public')); });

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});
