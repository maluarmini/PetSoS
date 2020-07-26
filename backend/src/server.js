const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


mongoose.connect('mongodb+srv://maluarmini:maluarmini@cluster0-78z0t.mongodb.net/newbanco?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(cors());

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333);

