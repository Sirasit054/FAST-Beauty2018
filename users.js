var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/smsservice";
var db;

MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    db = database;
    console.log("Connected to " + url);
});


 
function findAll(req, res) {
    var query = {};
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        // res.render('viewuser.hbs', {
        //     result: result
        // });
    });
};

function findByFname(req, res) {
    var query = {
        fname: req.query.fname
    };
    console.log(query);
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        // res.render('showuser.hbs', {
        //     result: result
        // });
    });
    // db.collection("users")
    //     .find({
    //             'fname': req.query.fname
    //         },
    //         function (err, item) {
    //             // res.send(item);
    //             console.log(item);
    //             res.render('showuser.hbs', {
    //                 item: item
    //             });
    //         });
};


function findByLname(req, res) {
    var query = {
        lname: req.query.lname
    };
    console.log(query);
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        // res.render('showuser.hbs', {
        //     result: result
        // });
    });
    // db.collection("users")
    //     .find({
    //             'fname': req.query.fname
    //         },
    //         function (err, item) {
    //             // res.send(item);
    //             console.log(item);
    //             res.render('showuser.hbs', {
    //                 item: item
    //             });
    //         });
};

function findByEmail(req, res) {
    var query = {
        email: req.query.email
    };
    console.log(query);
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        // res.render('showuser.hbs', {
        //     result: result
        // });
    });
    // db.collection("users")
    //     .find({
    //             'fname': req.query.fname
    //         },
    //         function (err, item) {
    //             // res.send(item);
    //             console.log(item);
    //             res.render('showuser.hbs', {
    //                 item: item
    //             });
    //         });
};



module.exports = {
    findAll: findAll,
    findByFname: findByFname, 
    findByEmail: findByEmail,
 
    findByLname: findByLname
};