const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
    config = require('./config/DB');

    const app = express();

    mongoose.Promise = global.Promise;
    const mongo = mongoose.connect(config.DB, {useNewUrlParser: true });
    mongo.then(() => {
    console.log('Database Connection was Successful');
    }).catch((err) => {
    console.log('err', err);
    });
    const bankBalanceRoutes = require('./routes/bankbalanceroute');
    const cookingRoutes = require('./routes/cookingroute');


    app.use(bodyParser.json());
    //app.use(cors());
    app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
    }));
    const port = process.env.PORT || 4000;
    app.use('/bankbalances', bankBalanceRoutes);
    app.use('/cooking', cookingRoutes);

    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
    });
