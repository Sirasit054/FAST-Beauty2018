var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/smsservice";
var db;

MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    db = database;
    
});


 
function findAllbeauty(req, res) {
    var query = {
        emailbeauty: req.query.emailbeauty
    };
    console.log(query);
    db.collection("beautydatas").find(query).toArray(function (err, result) {
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
function findBybeautyname(req, res) {
    var query = {
        beautyname: req.query.beautyname
    };
    console.log(query);
    db.collection("beautydatas").find(query).toArray(function (err, result) {
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

function findBybeautyemail(req, res) {
    var query = {
        email : req.query.email
    };
    console.log(query);
    db.collection("beautydatas").find(query).toArray(function (err, result) {
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



function deleteBybeautyname(req, res) {
    var beautyname = req.body.beautyname
    


 
    
  db.collection('beautydatas').deleteOne( { "beautyname" : ObjectId(beautyname) }, function(err, result) { 
    assert.equal(null, err);
    console.log('Item deleted');
    db.close();
    
});
}

module.exports = {
    findAllbeauty: findAllbeauty,
    findBybeautyname:findBybeautyname,
    deleteBybeautyname: deleteBybeautyname,
    findBybeautyemail: findBybeautyemail
};