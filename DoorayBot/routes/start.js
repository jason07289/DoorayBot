var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
  var today = new Date();   
  var end = new Date(today.getFullYear(),today.getMonth(),today.getDate(),09,00,00);

  var nt = today.getTime();
  var et = end.getTime();
  console.log(nt);
  console.log(et);

  var sec =parseInt(nt - et) / 1000;
  var day  = parseInt(sec/60/60/24);
  sec = (sec-(day * 60 * 60 * 24));
  var hour = parseInt(sec/60/60);
  sec = (sec-(hour*60*60));
  var min = parseInt(sec/60);
  sec = parseInt(sec-(min*60));
  if(hour<10&&hour>=0){hour="0"+hour;}
  if(min<10&&min>=0){min="0"+min;}
  if(sec<10&&sec>=0){sec="0"+sec;}


  res.json({"text": "일하신지 "+hour + '시간 ' + min + '분 ' + sec +'초 됬네요. ^^'
  , "responseType": "inChannel"
  });
});

module.exports = router;
