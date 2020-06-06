var createError = require('http-errors');
var express = require('express');
//var SHA256 = require("crypto-js/sha256");
var  settings=require('./settings')
var CryptoJS = require("crypto-js");            //whole file
var multer  = require('multer');               //file upload
var upload = multer({ dest: './public/images/' });
var storage = multer.diskStorage({                  
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getUTCMilliseconds()+file.originalname)
  }
})
 
var upload = multer({ storage: storage })
 


console.log(settings);

//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var controller =require('./controller');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//app.use(logger('dev'));                          //middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static('public/images/'));///

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.get('/', (req,res)=> {
   //res.send('helo world')
  //controller.getList(res);
 // res.send('helo world') 
  controller.getList(res);
});

////////////////////////////////////////////////////Password Hashing///////////////////////////////////////////////
app.post('/login', (req,res)=> {

  
       //var ciphertext  = CryptoJS.AES.decrypt(req.body.password.toString(), 'secert_key ');
       //var plaintext = ciphertext.toString(CryptoJS.enc.Utf8);

      // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');     ///syntax
 
       var ciphertext = CryptoJS.AES.encrypt(req.body.password, settings.secert_key);   ///crypto syntax
       console.log(ciphertext);
       controller.login(req,res,ciphertext);
      });
    

app.post('/Insert_Contact',(req,res)=>{
  //res.send("hello");
  //console.log(req)
  //res.send('tet');
  var ciphertext = CryptoJS.AES.encrypt(req.body.password, settings.secert_key);
  //var ciphertext  = CryptoJS.AES.encrypt( req.body.password,  settings.secert_key , { iv: iv, padding:CryptoJS.pad.NoPadding } );
//console.log(ciphertext.ciphertext.sigBytes);
  //console.log(SHA256("Message"));
       console.log(ciphertext.toString());
       
 
  controller.Insert_Contact(req,res,ciphertext);
});

///////////////////////////////////////////////File Upload (MULTER)/////////////////////////////////////////////////////////////

app.post('/profile', upload.single('ABC'), function (req, res) {   ////-->multer syntax-->key value ABC in postman-->in postman select form data->enter ABC in keyvalue -->select file
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

try{
  controller.LinkImg(req,res,req.file.filename);
  res.status(200).send(req.file);
}

catch(error){
  res.status(500).send(error);
  
}


}); 



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////ACCESS IMAGE////////////////////////////////////////////////////////////////////////////////

app.get('/Access_image', (req,res)=> {

 controller.Access_image(req,res);
});


app.post('/Update_Contact', (req, res)=>{
console.log(req.body.password)
  //res.send('added data succesfully')
  controller.Update_Contact(req, res);
  //res.send('helo world India')
});

  

app.post('/Delete_Contact', (req, res)=>{
 // res.send('Delete data succesfully')
  controller.Delete_Contact(req,res);
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
