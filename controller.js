var db = require('./db');
//var httpMsgs = require('../core/httpMsgs');
//var util = require("util");

exports.getList = function (resp) {

db.executeSql(`SELECT * FROM contact`, function (data, err) {
    if (err) {

       
       
        resp.status(500).send('Somethig went wrong!!');
    }
    else {
        resp.status(200).send(data);
    }
})
};
  
/////////////////////////////////////////////////Password Hashing///////////////////////////////////////////////////////
exports.login=function(req,resp,ciphertext){
    db.executeSql(`INSERT into contact(user_name,password) values('${req.body.user_name}','${ciphertext}')`, function (data, err) {
        if (err) {
            resp.status(500).send('Somethig went wrong!!');
        }
        else {
            resp.status(200).send(data);
        }
    })
    };
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////uploaded image in link format////////////////////////////////////////////////////////////// 

exports.LinkImg=function(req,resp,reqBody){

    db.executeSql(`insert into image(image) values('http://localhost:3000/${reqBody}')`, function (data, err) {
        if (err) {
    
           
           
            resp.status(500).send('Somethig went wrong!!');
        }
        else {
            //resp.status(200).send(data);
            resp.status(200);    ///no data only link
        }
    })
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////Access image//////////////////////////////////////////////////////////////////////////


    exports.Access_image=function(req,resp){

        db.executeSql(`Select * from image`, function (data, err) {
            if (err) {
        
            resp.status(500).send('Somethig went wrong!!');
            }
            else {
                //resp.status(200).send(data);
                resp.status(200).send(data);
            }
        })
        };











exports.Insert_Contact=function(req,resp,ciphertext){
    const sqlquery=`INSERT into contact(user_name,phone_no,e_mail,password)values('${req.body.user_name}','${req.body.phone_no}','${req.body.e_mail}','${ciphertext}')`

        console.log(sqlquery);
        console.log(ciphertext);
    db.executeSql(sqlquery,function(data,error){
        if(error){
            resp.status(500).send('SOMETHING WENT WRONG!!');
        }
        else{
            resp.status(200).send(data);

        }
    });
}

exports.Update_Contact = function (req, resp) {
    //console.log(reqBody.user_name,'=====>user_name')
    db.executeSql(`UPDATE contact SET password='${req.body.password}' WHERE id='${req.body.id}'`, function (data, err) {

        if (err) {
           
            resp.status(500).send('Somethig went wrong!!');
        }
        else {
            resp.status(200).send(data);
        }
    });
}

exports.Delete_Contact = function (req, resp) {
    //console.log(reqBody.user_name,'=====>user_name')
    db.executeSql(`DELETE from contact where id='${req.body.id}'`, function (data, err) {

        if (err) {
           
            resp.status(500).send('Somethig went wrong!!');
        }
        else {
            resp.status(200).send(data);
        }
    });
}







       


//     exports.addUserToList = function (req, resp, reqBody) {
//         console.log(reqBody,'=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

//         if(!util.isObject(reqBody)) {
//             resp.writeHead(500, { "Content-Type": "text/html" });
//             resp.write('internal server error');
//             resp.end();
//         }else {
         

//         reqBody = JSON.parse(reqBody);
//        var sql = "INSERT INTO converting (name, value, country) VALUES ";
//        sql += util.format("('%s', %d , '%s')", reqBody.name, reqBody.value,reqBody.country);

//        console.log(sql);

//         db.executeSql(sql, function (data, err) {
//             if (err) {
//                 resp.writeHead(500, { "Content-Type": "application/json" });
//                 resp.end();
//             }
//             else {
//                 resp.writeHead(200, { "Content-Type": "application/json" });
//                 if(data) resp.write(JSON.stringify(data));
//                 resp.end();
//             }
//         })
//     }
        
// };