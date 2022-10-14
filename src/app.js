require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

const dbConnect = require('../db/conn');
const authRoute = require('../routes/auth-route');
const warehouseRoute = require('../routes/warehouse-route');
const productRoute = require('../routes/product-route');

const PORT = process.env.PORT || 8000;
const __hostname = '127.0.0.1';

dbConnect();


const staticFilesPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'ejs');
app.use(express.static(staticFilesPath));

// app.use("/login", (req, res) => {
//     res.render('login');
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoute);
app.use('/api/warehouse', warehouseRoute);
app.use('/api/products', productRoute);
app.use("/", (req, res) => {
    res.render('farmerDashboard');
}); 


app.listen(PORT, () => {
    console.log(`Listening at http://${__hostname}:${PORT}`);
});

