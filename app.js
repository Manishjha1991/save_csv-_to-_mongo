var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var db = require('./model/db'),
blob = require('./model/pincode.js');
var app = express();

// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


const csvFilePath=path.join(__dirname, 'file.csv');

const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    //   console.log(jsonObj);

      // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
      var id = jsonObj.id;
      var area = jsonObj.area;
      var pincode = jsonObj.pincode;
      var country = jsonObj.country;
      var state = jsonObj.state;
      var city = jsonObj.city;
      var dcity = jsonObj.dcity;
      var subarea = jsonObj.subarea;
      var mainarea = jsonObj.mainarea;
      var stdcode = jsonObj.stdcode;
      var display_flag = jsonObj.display_flag;
      var deleted = jsonObj.deleted;
      var typeflag = jsonObj.typeflag;
      var updatedon = jsonObj.updatedon;
      var createdon = jsonObj.createdon;
      var latitude = jsonObj.latitude;
      var longitude = jsonObj.longitude;

      //call the create function for our database
      mongoose.model('doc_area_master').create({
        _id:id,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      area:area,
         pincode: pincode,
         country:country ,
         state:state,
         city: city,
         dcity: dcity,
         subarea:subarea ,
         mainarea:mainarea,
         stdcode: stdcode,
         display_flag: display_flag,
         deleted:deleted,
         typeflag:typeflag,
         updatedon:updatedon,
         createdon:createdon,
         latitude:latitude ,
         longitude:longitude
      }, function (err, blob) {
            if (err) {
                // res.send("There was a problem adding the information to the database.");
                console.log(err);
                console.log("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
              console.log(blob);
            }
      })
})
.on('done',(error)=>{
    console.log('end')
})


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
