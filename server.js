const express = require('express');
const hbs = require('hbs');
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: 'b861cb06',
    apiSecret: 't2XQYYDUtUXSY5ki'
})



// const fs = require('fs');
var multer = require('multer');

var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var MongoClient = require('mongodb').MongoClient;


//var objectId = require('mongodb').ObjectID;
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var assert = require('assert');
var bodyParser = require('body-parser');
var app = express();
var user = require('./users.js');
var customer = require('./customers.js');
var beauty = require('./showbeauty.js');
var booking = require('./booking.js');


var moment = require('moment');
moment.locale('th');

var upload = multer({ dest: 'assets/uploads/' });
var path = require('path');

var router = express.Router();

var expressValidator = require('express-validator');
var expressSession = require('express-session');
var passwordHash = require('password-hash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + "/view"));
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
//app.use(multer());

// sets the static files location to public



//SMS

var url = 'mongodb://localhost:27017/smsservice';
function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(logger);
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});


app.post('/upload', upload.any(),function (req, res, next) {
   

     MongoClient.connect(url, function (err, db) {
         assert.equal(null, err);
         db.collection('post').insertOne({
              email: req.session.customer,
              pic: req.files[0].filename,
              title: req.body.title,
              detail: req.body.detail,
              beautyname:req.body.beautyname,
              create_date: moment().format('LLL')

          }, function (err, result) {
            assert.equal(null, err);
            req.session.regisComplete = true;
            console.log('Regis complete - insert user to db');
            db.close();
            res.redirect('/get-post');
        });
    });
});

app.post('/upload1', upload.any(),function (req, res, next) {
    
 
      MongoClient.connect(url, function (err, db) {
          assert.equal(null, err);
          db.collection('post').insertOne({
               email:  req.session.user,
               pic: req.files[0].filename,
               title: req.body.title,
               detail: req.body.detail,
               beautyname:req.body.beautyname,
               create_date: moment().format('LLL')
 
           }, function (err, result) {
             assert.equal(null, err);
             req.session.regisComplete = true;
             console.log('Regis complete - insert user to db');
             db.close();
             res.redirect('/get-post1');
         });
     });
 });

 app.post('/update/:_id', upload.any(),function (req, res, next) {
    
    var id = req.params._id;
    var resultArray = [];
    console.log(id);
 
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('beautydatas1').findOneAndUpdate( 
            {_id: req.params._id },
            {
                beautyname: req.body.beautyname,
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                gender: req.body.gender,
                day: req.body.day,
                pic: req.files[0].filename,
                beautycian: req.body.beautycian,
                location:req.body.location,
                type: req.body.type,
                type1: req.body.type1,
                type2: req.body.type2,
                type3: req.body.type3,
                type4: req.body.type4,
                min: req.body.min,
                min1: req.body.min1,
                min2: req.body.min2,
                min3: req.body.min3,
                min4: req.body.min4,
                max: req.body.max,
                max1: req.body.max1,
                max2: req.body.max2,
                max3: req.body.max3,
                max4: req.body.max4,
            },
            { upsert: true }
    
            // no: list.no,
           , function (err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    var errors = false;
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }
    console.log("Send one recipients complete !!!");
    res.redirect('/indexopen');
    // });
    });

app.get('/showall', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/list.html"));
});

app.get('/searchbyfname', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/search.html"));
});

app.get('/searchbymail', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/searchmail.html"));
});

app.get('/showallcus', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/listcus.html"));
});

app.get('/searchbyfnamecus', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/searchcus.html"));
});
app.get('/showallbook', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/listbook.html"));
});
app.get('/searchbymailcus', function (req, res) {
    if (req.session.loginComplete) {
        res.sendFile(path.join(__dirname + "/view/searchmailcus.html"));

    } else {
        req.session.alertLogin = true;
        res.redirect('loginadmin');
    }

});

app.get('/showallbeauty', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/listbeauty.html"));
});

app.get('/searchbynamebeauty', function (req, res) {
    res.sendFile(path.join(__dirname + "/view/searchbeauty.html"));
});


app.get('/indexfind', function (req, res) {
    res.render('indexfind.hbs', {

    });
});

app.get('/Bookingalert', function (req, res) {
    res.render('Bookingalert.hbs', {

    });
});

app.get('/bookingall', function (req, res) {
    res.render('bookingall.hbs', {

    });
});

app.get('/book', function (req, res) {
    res.render('book.hbs', {

    });
});


app.get('/newpost', function (req, res) {
    res.render('newpost.hbs', {

    });
});


app.get('/List_store1', function (req, res) {
    res.render('List_store1.hbs', {

    });
});


app.get('/newpost1', function (req, res) {
    res.render('newpost1.hbs', {

    });
});

app.get('/Book', function (req, res) {
    res.render('Book.hbs', {

    });
});

app.get('/indexpost', function (req, res) {
    res.render('indexpost.hbs', {

    });
});

app.get('/indexpost1', function (req, res) {
    res.render('indexpost1.hbs', {

    });
});

app.get('/mypost', function (req, res) {
    res.render('mypost.hbs', {

    });
});

app.get('/mypost1', function (req, res) {
    res.render('mypost1.hbs', {

    });
});


app.get('/smsservice', function (req, res) {
    res.render('smsservice.hbs', {

    });
});

app.get('/beautyhome', function (req, res) {
    res.render('beautyhome.hbs', {

    });
});



app.get('/indexopen', function (req, res) {
    res.render('indexopen.hbs', {

    });
});
app.get('/index', (req, res) => {
    // console.log(req.session.alertLogin);
    res.render('index.hbs', {

    });

});

app.get('/loginEm', (req, res) => {
    res.render('loginEm.hbs', {

        regisComplete: req.session.regisComplete,
        loginIncorrect: req.session.loginIncorrect,
        plslogin: req.session.plsLogin,
        editProfileComplete: req.session.editProfileComplete
    });
    req.session.editProfileComplete = null;
    req.session.plsLogin = null;
    req.session.loginIncorrect = null;
    req.session.regisComplete = null;
});

app.get('/manageuser', (req, res) => {
    if (req.session.loginComplete) {
        res.render('manageuser.hbs');
    } else {
        req.session.alertLogin = true;
        res.redirect('loginadmin');
    }
});
app.get('/loginadmin', (req, res) => {
    res.render('loginadmin.hbs', {
        regisComplete: req.session.regisComplete,
        loginIncorrect: req.session.loginIncorrect,
        plslogin: req.session.plsLogin,
        editProfileComplete: req.session.editProfileComplete
    });
    req.session.editProfileComplete = null;
    req.session.plsLogin = null;
    req.session.loginIncorrect = null;
    req.session.regisComplete = null;
});



app.get('/customers1', (req, res) => {
    if (req.session.loginComplete) {
        res.render('customers.hbs');
    } else {
        req.session.alertLogin = true;
        res.redirect('loginEm');
    }
});


//customer
app.get('/login', (req, res) => {
    res.render('login.hbs', {
        customer: req.session.customers,
        regisComplete: req.session.regisComplete,
        loginIncorrect: req.session.loginIncorrect,
        plslogin: req.session.plsLogin,
        editProfileComplete: req.session.editProfileComplete
    });
    req.session.editProfileComplete = null;
    req.session.plsLogin = null;
    req.session.loginIncorrect = null;
    req.session.regisComplete = null;
    req.session.customers = null;
});
app.get('/signupadmin', (req, res) => {
    // console.log(req.session.alertLogin);
    res.render('signupadmin.hbs', {

    });

});

app.get('/signupcus', (req, res) => {
    // console.log(req.session.alertLogin);
    res.render('signupcus.hbs', {

    });

});
//user
app.get('/signup', (req, res) => {
    // console.log(req.session.alertLogin);
    res.render('signup.hbs', {

    });

});

app.get('/home', (req, res) => {
    console.log(req.session.LimitBalance);
    if (req.session.loginComplete) {
        res.render('home.hbs', {
            success: req.session.success,
            errors: req.session.errors,
            limitBalance: req.session.LimitBalance
        });
    } else {
        req.session.alertLogin = true;
        res.redirect('loginEm');
    }
    req.session.LimitBalance = null;
    req.session.errors = null;
    req.session.success = null;
});

app.get('/logout', (req, res) => {
    req.session.alertLogin = false;
    req.session.loginComplete = false;
    res.redirect('/');
});

//CheckUser
app.post('/loginCheck', (req, res) => {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        // console.log(req.body.uname);
        // console.log(req.body.pass);
        var cursor = db.collection('users').find({
            email: req.body.uname
            // pass: req.body.pass
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            // console.log(resultArray);
            // console.log(resultArray[0].pass);
            // console.log(passwordHash.verify(req.body.pass, resultArray[0].pass));
            if (resultArray != "") {
                var chkPass = passwordHash.verify(req.body.pass, resultArray[0].pass);
                if (!chkPass || (resultArray == "")) {
                    req.session.loginCheck = true;
                    res.redirect('loginEm');
                } else {
                    req.session.user = req.body.uname;
                    req.session.loginIncorrect = false;
                    console.log(req.session.user);
                    req.session.alertLogin = false;
                    res.redirect('indexopen');
                }
            } else {
                req.session.loginIncorrect = true;
                req.session.alertLogin = false;
                res.redirect('/loginEm');
            }
        });
    });
});

//CheckAdmin
app.post('/loginCheck1', (req, res) => {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        // console.log(req.body.uname);
        // console.log(req.body.pass);
        var cursor = db.collection('admins').find({
            email: req.body.uname
            // pass: req.body.pass
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            // console.log(resultArray);
            // console.log(resultArray[0].pass);
            // console.log(passwordHash.verify(req.body.pass, resultArray[0].pass));
            if (resultArray != "") {
                var chkPass = passwordHash.verify(req.body.pass, resultArray[0].pass);
                if (!chkPass || (resultArray == "")) {
                    req.session.loginCheck = true;
                    res.redirect('loginadmin');
                } else {
                    req.session.loginIncorrect = false;
                    req.session.alertLogin = false;
                    req.session.admin = req.body.uname;
                    console.log(req.session.admin);
                    res.redirect('showall');
                }
            } else {
                req.session.loginIncorrect = true;
                req.session.alertLogin = false;
                res.redirect('/loginadmin');
            }
        });
    });
});



//CheckCustomer
app.post('/loginCheck2', (req, res) => {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        // console.log(req.body.uname);
        // console.log(req.body.pass);
        var cursor = db.collection('customers').find({
            email: req.body.uname
            // pass: req.body.pass
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            // console.log(resultArray);
            // console.log(resultArray[0].pass);
            // console.log(passwordHash.verify(req.body.pass, resultArray[0].pass));
            if (resultArray != "") {
                var chkPass = passwordHash.verify(req.body.pass, resultArray[0].pass);
                if (!chkPass || (resultArray == "")) {
                    req.session.loginCheck = true;

                    res.redirect('login');
                } else {
                    req.session.loginIncorrect = false;
                    req.session.customer = req.body.uname;
                    req.session.alertLogin = false;
                    console.log(req.session.customer);

                    res.redirect('indexfind');
                }
            } else {
                req.session.loginIncorrect = true;
                req.session.alertLogin = false;
                res.redirect('/login');
            }
        });
    });
});


//rigisuser
app.post('/regisToDB', (req, res) => {
    var password = passwordHash.generate(req.body.passRegis);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('users').insertOne({
            fname: req.body.fnameRegis,
            lname: req.body.lnameRegis,
            email: req.body.emailRegis,
            pass: password
        }, function (err, result) {
            assert.equal(null, err);
            req.session.regisComplete = true;
            console.log('Regis complete - insert user to db');
            db.close();
            res.redirect('loginEm');
        });
    });

    // res.redirect('/');
});

//rigisadmin
app.post('/registoadmin', (req, res) => {
    var password = passwordHash.generate(req.body.passRegis);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('admins').insertOne({
            fname: req.body.fnameRegis,
            lname: req.body.lnameRegis,
            email: req.body.emailRegis,
            pass: password
        }, function (err, result) {
            assert.equal(null, err);
            req.session.regisComplete = true;
            console.log('Regis complete - insert user to db');
            db.close();
            res.redirect('loginadmin');
        });
    });

    // res.redirect('/');
});

//regiscustomer
app.post('/registocus', (req, res) => {
    var password = passwordHash.generate(req.body.passRegis);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('customers').insertOne({
            fname: req.body.fnameRegis,
            lname: req.body.lnameRegis,
            email: req.body.emailRegis,
            phone: req.body.phoneRegis,
            pass: password
        }, function (err, result) {
            assert.equal(null, err);

            req.session.regisComplete = true;
            console.log('Regis complete - insert user to db');
            db.close();
            res.redirect('login');
        });
    });

    // res.redirect('/');
});


app.get('/get-data', function (req, res, next) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('beautydatas1').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('List_store', { items: resultArray });
            // console.log(resultArray);

            console.log(resultArray);


        });
    });
});

app.post('/search', function (req, res, next) {
    var resultArray = [];
    var name =req.body.beautyname;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('beautydatas1').find({
            beautyname: new RegExp(req.body.beautyname)
        });
        
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('List_store', { items: resultArray });
            // console.log(resultArray);

            console.log(resultArray);


        });
    });
});
app.get('/get-data1/:email', function (req, res, next) {
    var id = req.params.email;
    var resultArray = [];
    console.log(id);
    console.log(req.params.email);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('beautydatas1').find({
            email: new RegExp(req.params.email)
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('List_store1', { items: resultArray });
            req.session.beautybook = req.params.email;
            console.log(resultArray[0].location);
            req.session.mapdata = resultArray;
            console.log( req.session.mapdata);
            

        });
    });
});

app.get('/get-map', function (req, res, next) {
            res.render('map', { items:  req.session.mapdata });
            console.log( req.session.mapdata);
});



app.get('/get-user', function (req, res, next) {

    var resultArray = [];

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('users').find({
            email: new RegExp(req.session.user)
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('customers', { items: resultArray });
            console.log(req.session.user);
        });
    });
});

app.get('/get-customer', function (req, res, next) {

    var resultArray = [];

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('customers').find({
            email: new RegExp(req.session.customer)
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('customers', { items: resultArray });
           
            console.log(req.session.customer);
            console.log( phone);
        });
    });
});

app.get('/get-beauty', function (req, res, next) {
    var id = req.params.id;
    var resultArray = [];

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('beautydatas1').find({
            email: new RegExp(req.session.user)
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('beautyhome', { items: resultArray });

            console.log(req.session.user);
        });
    });
});


//ส่งข้อความกลับหาลูกค้า
app.post('/get-book/:beautyname', (req, res) => {
    
    
        
        var id = req.params.custel;
        var resultArray = [];
        console.log(id);
        //console.log(req.params.custel);
        console.log(req.body.wait);
        console.log(req.body.msg_data);
        console.log(req.body.cusname);
        const from = 'Fast Beauty'
        const to = req.params.custel;
        const text = req.body.wait;
        //66979798188
        // nexmo.message.sendSms(from, to, text, (error, response) => {
        //     if (error) {
        //         throw error;
        //     } else if (response.messages[0].status != '0') {
        //         console.error(response);
        //         throw 'Nexmo returned back a non-zero status';
        //     } else {
        //         console.log(response);
        //     }
        // });
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('booking').findOneAndUpdate( 
                { custel: req.params.custel },
                {
                    beautyname: req.body.beautyname,
                    beautytel: req.body.beautytel,
                    beautyemail: req.body.beautyemail,
                    cusname: req.body.cusname,
                    custel: req.params.custel,
                    type: req.body.type,
                    msg_data: req.body.msg_data,
                    time: req.body.time,
                    wait: req.body.wait
                },
                { upsert: true }
        
                // no: list.no,
               , function (err, result) {
                assert.equal(null, err);
                console.log('Item inserted');
                db.close();
            });
        });
        var errors = false;
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
        } else {
            req.session.success = true;
        }
        console.log("Send one recipients complete !!!");
        res.redirect('/indexopen');
        // });
        });
    
app.get('/get-post', function (req, res, next) {

    var resultArray = [];
    var sort = {create_date: -1}; 

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('post').find().sort(sort);
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('indexpost', { items: resultArray });

        });
    });
});


app.get('/get-post1', function (req, res, next) {

    var resultArray = [];
    var sort = {create_date: -1};
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('post').find().sort(sort);
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('indexpost1', { items: resultArray });

        });
    });
});

//mypost ลูกค้า
app.get('/get-mypost', function (req, res, next) {

    var resultArray = [];
    var sort = {create_date: -1};
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('post').find({
            email: new RegExp(req.session.customer)
        }).sort(sort);
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('mypost', { items: resultArray });

            console.log(req.session.customer);
        });
    });
});

//mypost เจ้าของร้าน
app.get('/get-mypost1', function (req, res, next) {

    var resultArray = [];
    var sort = {create_date: -1};
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('post').find({
            email: new RegExp(req.session.user)
        }).sort(sort);
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('mypost1', { items: resultArray });

            console.log(req.session.user);
        });
    });
});

 app.get('/get-postbeauty/:beautyname', function (req, res, next) {
        
        var id = req.params.beautyname;
        var resultArray = [];
         console.log(id);
         console.log(req.params.email);
         MongoClient.connect(url, function (err, db) {
             assert.equal(null, err);
             var cursor = db.collection('beautydatas1').find({
                 beautyname: new RegExp(req.params.beautyname)
             });
             cursor.forEach(function (doc, err) {
                 assert.equal(null, err);
                resultArray.push(doc);
            }, function () {
                 db.close();
                 res.render('List_store1', { items: resultArray });
                 req.session.beautybook = req.params.email;
                 console.log(resultArray);
                 console.log(req.session.beautybook);
                     });
             });
       });
       app.get('/get-postbeauty1/:beautyname', function (req, res, next) {
        
        var id = req.params.beautyname;
        var resultArray = [];
         console.log(id);
         console.log(req.params.email);
         MongoClient.connect(url, function (err, db) {
             assert.equal(null, err);
             var cursor = db.collection('beautydatas1').find({
                 beautyname: new RegExp(req.params.beautyname)
             });
             cursor.forEach(function (doc, err) {
                 assert.equal(null, err);
                resultArray.push(doc);
            }, function () {
                 db.close();
                 res.render('List_store2', { items: resultArray });
                 req.session.beautybook = req.params.email;
                 console.log(resultArray);
                 console.log(req.session.beautybook);
                     });
             });
       });
//booking
app.get('/get-book', function (req, res, next) {

    var resultArray = [];

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('booking').find({
            beautyemail: new RegExp(req.session.user),
            wait: new RegExp("waiting")
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('Bookingalert', { items: resultArray });
            console.log(req.session.user);
            console.log(resultArray);
           
        });
    });
});

app.get('/get-bookall', function (req, res, next) {
    
        var resultArray = [];
    
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            var cursor = db.collection('booking').find({
                beautyemail: new RegExp(req.session.user)
            });
            cursor.forEach(function (doc, err) {
                assert.equal(null, err);
                resultArray.push(doc);
            }, function () {
                db.close();
                res.render('bookingall', { items: resultArray });
                console.log(req.session.user);
               
            });
        });
    });
    

app.get('/get-bookdata', function (req, res, next) {

    var resultArray = [];

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('beautydatas1').find({
            email: new RegExp(req.session.beautybook)
        });
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('smsservice', { items: resultArray });
            console.log(req.session.beautybook);
            console.log(resultArray);
        });
    });
});

//newpostcustomer

//ของลุกค้า
app.post('/sendsms', (req, res) => {

    console.log(req.body.beautytel);
    console.log(req.body.beautyemail);
    console.log(req.body.cusname);
    req.session.beautytel = req.body.beautytel;
    req.session.beautyemail = req.body.beautyemail;
    
    // const from = 'Fast Beauty'
    // const to = req.body.beautytel;
    // const text = req.body.msg_data;
    // //66979798188
    // nexmo.message.sendSms(from, to, text, (error, response) => {
    //     if (error) {
    //         throw error;
    //     } else if (response.messages[0].status != '0') {
    //         console.error(response);
    //         throw 'Nexmo returned back a non-zero status';
    //     } else {
    //         console.log(response);
    //     }
    // });
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('booking').insertOne({
            // no: list.no,
            beautyname: req.body.beautyname,
            beautytel: req.body.beautytel,
            beautyemail: req.body.beautyemail,
            cusname: req.session.customer,
            custel: req.body.custel,
            type: req.body.type,
            msg_data: req.body.msg_data,
            time: req.body.time,
            wait: req.body.wait
        }, function (err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    var errors = false;
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }
    console.log("Send one recipients complete !!!");
    res.redirect('/indexfind');
    // });
    //------------------------------------------------------------------comment to test function (don't send a message)---------------------------
});

//ของร้าน
app.post('/get-book/:custel', (req, res) => {


    
    var id = req.params.custel;
    var resultArray = [];
    console.log(id);
    //console.log(req.params.custel);
    console.log(req.body.wait);
    console.log(req.body.msg_data);
    console.log(req.body.cusname);
    const from = 'Fast Beauty'
    const to = req.params.custel;
    const text = req.body.wait;
    //66979798188
    // nexmo.message.sendSms(from, to, text, (error, response) => {
    //     if (error) {
    //         throw error;
    //     } else if (response.messages[0].status != '0') {
    //         console.error(response);
    //         throw 'Nexmo returned back a non-zero status';
    //     } else {
    //         console.log(response);
    //     }
    // });
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('booking').findOneAndUpdate( 
            { custel: req.params.custel },
            {
                beautyname: req.body.beautyname,
                beautytel: req.body.beautytel,
                beautyemail: req.body.beautyemail,
                cusname: req.body.cusname,
                custel: req.params.custel,
                type: req.body.type,
                msg_data: req.body.msg_data,
                time: req.body.time,
                wait: req.body.wait
            },
            { upsert: true }
    
            // no: list.no,
           , function (err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    var errors = false;
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }
    console.log("Send one recipients complete !!!");
    res.redirect('/indexopen');
    // });
    });


app.get('/users', user.findAll);
app.get('/users/search', user.findByFname);
app.get('/users/searchl', user.findByLname);
app.get('/users/searchmail', user.findByEmail);
app.get('/customers', customer.findAll);
app.get('/customers/search', customer.findByFname);
app.get('/customers/searchl', customer.findByLname);
app.get('/customers/searchmail', customer.findByEmail);
app.get('/beautys', beauty.findAllbeauty);
app.get('/beautys/search', beauty.findBybeautyname);
app.get('/beautys/delete', beauty.deleteBybeautyname);
app.get('/beautys/show', beauty.findBybeautyemail);
app.get('/booking', booking.findbookAll);
app.get('/booking/search', booking.findbookBybeauty);
app.listen('3000', function () {
    console.log('running on 3000...');
});
module.exports = app;