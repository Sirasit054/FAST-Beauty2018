var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/smsservice";
var db;

MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    db = database;
    console.log("Connected to " + url);
});


 
function findbookAll(req, res) {
    var query = {};
    db.collection("booking").find(query).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        // res.render('viewuser.hbs', {
        //     result: result
        // });
    });
};


function findbookBybeauty(req, res) {
    var query = {
        beautyname: req.query.email
    };
    console.log(query);
    db.collection("booking").find(query).toArray(function (err, result) {
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
    findbookAll: findbookAll, 
    findbookBybeauty: findbookBybeauty
 
};