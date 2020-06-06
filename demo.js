var CryptoJS = require("crypto-js/md5")

//var ciphertext = CryptoJS.AES.encrypt('123456789', 'secret key 123');   ///crypto syntax
       //console.log(ciphertext.toString());

var temporary=CryptoJS('123456789','secert key 123');
console.log(temporary.toString());